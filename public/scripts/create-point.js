

function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then ( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    } )
}

populateUFs()


function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then ( cities => {
        

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled = false

    } )

}



 document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



    // ITENS DE COLETA
    // Pegar todos os LI's

    const ItemsToCollect = document.querySelectorAll(".items-grid li")

    for (const item of ItemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    
    const  collectedItems = document.querySelector("input[name=items]")

    let selectItems = []


    function handleSelectedItem(event) {
        // adicionar ou remover uma classe com javascript

        const itemLi = event.target
        itemLi.classList.toggle("selected")


        const itemId = itemLi.dataset.id


        //Verificar se existem itens selecionados, se sim
        //pegar os itens selecionados

        const alreadySelected = selectItems.findIndex( item => {
            const itemFound = item == itemId // , encontrar o item, e se for igual true ou false
            return itemFound
        })


        //Se já estiver selecionado, tirar da seleção
        if(alreadySelected >= 0){
            const filteredItems = selectItems.filter( item => {
                const itemIsDifferent = item != itemId
                return false
            })

            selectItems = filteredItems
        } else {
            //se não estiver selecionado, adicionar à seleção
            selectItems.push(itemId)
        }

        //atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectItems




    }
        
    





 