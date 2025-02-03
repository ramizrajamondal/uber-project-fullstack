const mongoose = require("mongoose")
const dbConfig = require("../constant.js")
const dbConnection = () => {
    try {
        const res = mongoose
        .connect(`${process.env.MONGODB_URI}/${dbConfig.dbName}`)
        console.log("connected to the database")
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbConnection;
