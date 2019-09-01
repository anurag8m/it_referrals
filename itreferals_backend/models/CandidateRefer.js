var mongoose = require("mongoose");

// var Constants = require('../models/Constants')

var nodeschema = new mongoose.Schema({

    referredName: String,
    referredLinkedIn: String,
    referredResumeLink: String,
    referredBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    jobId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    createdTime: { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    isactive: { type: Boolean, default: 1 }
});

module.exports = mongoose.model("candidaterefer", nodeschema);