const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.get("/",function(req,res) {
    res.send("hey developers")
})
module.exports = app