var express = require("express");
var router = express.Router();
var categoryObj = require("../models/Category");



// api to create directory
router.post("/createCategory", function (req, res) {

    categoryObj.create(req.body, function (err, categoryCreated) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            res.send(message)
        }
        else {
            var message = { "Success": 1, "Category": categoryCreated };
            res.send(message)
        }
    });
});

// api to get categiry
router.get("/getAllCategory", function (req, res) {

    categoryObj.find({ 'isactive': true }, function (err, CategoryList) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            res.send(message)
        }
        else {
            var message = { "Success": 1, "Category": CategoryList };
            res.send(message)
        }
    })
});

// api to get homepage category 
router.get("/getHomepageCategory", function (req, res) {

    categoryObj.find({ 'isactive': true, 'isForHomePage': true }, function (err, CategoryList) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            res.send(message)
        }
        else {
            var message = { "Success": 1, "Category": CategoryList };
            res.send(message)
        }
    })
});





module.exports = router;