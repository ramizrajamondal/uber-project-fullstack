const captainModel = require("../models/captainModel");
const blackListTokenModel = require("../models/blacklistModel");
const jwt = require("jsonwebtoken");

const captainAuth = async (req,res,next) => {
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token) {
        return res.status(401).json({message: "please login"});
    }
    
    const isBlacklisted = await blackListTokenModel.findOne({token});
    if(isBlacklisted) return res.status(401).json({message: "unauthorized"})

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if(!captain) return res.status(501).json({message: "captain is not available"});
        req.captain = captain;
        return next();
    } 
    catch (error) {
        res.status(501).json({error: error.message});
    }
   
}

module.exports = captainAuth;