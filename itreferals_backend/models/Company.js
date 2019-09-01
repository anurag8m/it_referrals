var mongoose = require("mongoose");

// var Constants = require('../models/Constants')

var nodeschema = new mongoose.Schema({
    name : String,
    address : String,
    
    createdTime : { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("company", nodeschema);