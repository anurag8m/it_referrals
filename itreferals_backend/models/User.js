var mongoose = require("mongoose");

var Constants = require('../models/Constants')

var nodeschema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    resumeLink: String,
    userType: { type: Number, default: Constants.USER_TYPE.NORMALUSER },
    createdTime: { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    isactive: { type: Boolean, default: 1 }
});

module.exports = mongoose.model("user", nodeschema);