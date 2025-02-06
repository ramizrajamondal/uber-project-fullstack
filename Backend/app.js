const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/",function(req,res) {
    res.send("hey developers")
})
// user Route config
const userRouter = require("./routes/userRoute.js")
app.use("/users",userRouter)

// captain Route config
const captainRoute = require("./routes/captainRoute.js");
app.use("/captain",captainRoute);

module.exports = app