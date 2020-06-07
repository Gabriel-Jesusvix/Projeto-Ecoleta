const express = require("express")
const server = express()

//pegar o banco de dados

const db =  require("./database/db")


//configurar pasta public

server.use(express.static("public") )

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded ({extended:true}))


//utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})



//configurar caminhos da aplicação
// pagina inicial

//Req: Requisição
//Res: Resposta

server.get("/", (req, res) => {
   return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {
   

   return res.render("create-point.html")

})

server.post("/savepoint", (req, res) => {
   return res.send("Ok")
})

server.get("/search", (req, res) => {
   // pegar os dados do banco de dados
   
   db.all(`SELECT * FROM places`, function(err, rows) {
      if(err) {
          return console.log(err)
      }

      const total = rows.length



      //mostrar a pagina HTML com os dados do banco de dados
      return res.render("search-results.html", {places: rows, total})


   })

})
   
   
 




 // ligar o servidor


server.listen(3000)