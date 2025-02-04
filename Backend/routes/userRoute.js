const express = require('express');
const router = express.Router();
const {
    registerUser, loginUser, userProfile,userLogout 
    } = require("../controllers/userController.js")
const authMiddleware = require("../middlewares/auth.js")


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/profile",authMiddleware,userProfile)
router.get("/logout",authMiddleware,userLogout)

module.exports = router;