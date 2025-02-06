const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            trim: true,
            minlength: [3, "first name must be contain 3 character"]
        },
        lastName: {
            type: String,
            trim: true,
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        require: true,
        select: false,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active',
    },
    color: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        min: [1, 'Capacity must be at least 1']
    },
    vechileType: {
        type: String,
        enum: ['Bike', "Car", "Taxi"],
        required: true,
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIARY }
    )
    return token;
}

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;