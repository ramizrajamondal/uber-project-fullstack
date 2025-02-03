const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/",function(req,res) {
    res.send("hey developers")
})
// user Route config
const userRouter = require("./routes/userRoute.js")
app.use("/users",userRouter)

module.exports = app