const userModel = require("../models/userModel.js");
const userService = require("../services/userService.js");
const blackListTokenModel = require("../models/blacklistModel.js");

const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        const existedUser = userModel.findOne({email});
        if(existedUser) return res.status(401).json({message: "user is already exist"})
        const hashPassword = await userModel.hashPassword(password);
        
        const user = await userService.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new Error("email and password is required");
        }
        const existUser = await userModel.findOne({ email }).select("+password");
        if (!existUser) return res.status(401).json({ message: 'username or password is invalid' });
        ispasswordTrue = await existUser.isPasswordCorrect(password);
        if (!ispasswordTrue) {
            return res.status(401).json({ message: 'username or password is invalid' });
        }
        const token = existUser.generateAuthToken();
        res.cookie('token',token);
        res.status(201).json({existUser, token});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const userProfile = async (req,res) => {
   res.status(200).json(req.user)
}

const userLogout = async (req,res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blackListTokenModel.create({token})
    res.status(201).json({message: "Logged out"})
}

module.exports = { registerUser, loginUser, userProfile, userLogout};