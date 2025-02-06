const express = require("express");
const router = express.Router();
const {
    registerCaptain, loginCaptain, profileCaptain,
    logoutCaptain,

} = require("../controllers/captainController.js");
const captainAuth = require("../middlewares/captainAuth.js");

router.post("/register",registerCaptain);
router.post("/login",loginCaptain);
router.get("/profile",captainAuth,profileCaptain);
router.get("/logout",captainAuth,logoutCaptain);

module.exports = router;