const captainModel = require('../models/captainModel');
const blackListTokenModel = require("../models/blacklistModel");


const registerCaptain = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            status,
            color,
            plate,
            capacity,
            vechileType,
        } = req.body;
        if (
            !fullName || !email || !password || !status ||  !color ||
            !plate || !capacity || !vechileType
        ){
            res.status(401).json({ message: 'each field is required' })
        }

        const existedCaptain = await captainModel.findOne({ email });
        if(existedCaptain) return res.status(401).json({message: 'user is already exist'});

        const hashedPassword = await captainModel.hashPassword(password);
    
        const captain = await captainModel.create({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            status: status,
            color,
            plate,
            capacity: capacity,
            vechileType: vechileType,
        })
        const token = captain.generateAuthToken()
        res.status(201).json({ captain, token })
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }

}

const loginCaptain = async (req,res) => {
    const { email,password } = req.body;
    try {

        if( !email || !password ){
           return res.status(401).json({message: 'email or password is required'});
        }
        const existCaptain = await captainModel.findOne({email}).select("+password");
        if(!existCaptain) return res.status(401),json({message: "user is not register"});
        const ispasswordTrue = await existCaptain.comparePassword(password);
        if(!ispasswordTrue) return res.status(401).json({message: "email or password is incorrect"});
        const token = existCaptain.generateAuthToken();
        res.cookie('token',token);
        res.status(201).json({ existCaptain, token })
    } 
    catch (error) {
        res.status(502).json({error: message.error})
    }
}

const profileCaptain = async (req,res) => {
    res.status(201).json(req.captain);
}

const logoutCaptain = async (req,res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blackListTokenModel.create({token});
        res.clearCookie("token");
        res.status(201).json({message: "Log out sucessfully"});    
    } 
    catch (error) {
        res.status(501).json({error: error.message});
    }
}

module.exports =  {
    registerCaptain, loginCaptain, 
    profileCaptain,logoutCaptain,
};

