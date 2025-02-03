const http = require("http")
const app = require("./app.js")
// database connection 
const dbConnection = require("./database/db.js")
dbConnection()

const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`app is runing at port ${port}`)
})
