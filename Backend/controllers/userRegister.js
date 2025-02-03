const userModel = require("../models/userModel.js");
const userService = require("../services/userService.js");

const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

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

module.exports = { registerUser };