const userModel = require("../models/userModel");
const blackListTokenModel = require("../models/blacklistModel");
const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "unauthorizied" })
    }
    
    const isBlacklisted = await blackListTokenModel.findOne({token})

    if(isBlacklisted) return res.status(401).json({ message: 'Unauthorized' });

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next()

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = authMiddleware;