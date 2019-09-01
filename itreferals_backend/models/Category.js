var mongoose = require("mongoose");

// var Constants = require('../models/Constants')

var nodeschema = new mongoose.Schema({
    name : String,
    description : String,
    catImage : String,
    isForHomePage : {type : Boolean, default : 0 },    
    createdTime : { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("category", nodeschema);