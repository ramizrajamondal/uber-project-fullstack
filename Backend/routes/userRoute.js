const express = require('express');
const router = express.Router();
const { registerUser } = require("../controllers/userRegister.js")


router.post("/register",registerUser)

module.exports = router;