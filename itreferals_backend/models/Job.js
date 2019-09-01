var mongoose = require("mongoose");

var Constants = require('../models/Constants')

var nodeschema = new mongoose.Schema({
    userWhoCreated:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: { type: Number, default: Constants.JOB_STATUS.PENDING },
    companyNane: String,
    contactPerson: String,
    jobTitle: String,
    category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    duration: { type: Number, default: 0 },
    description: String,
    descriptionLink: String,
    createdTime: { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    isactive: { type: Boolean, default: 1 }
});

module.exports = mongoose.model("job", nodeschema);