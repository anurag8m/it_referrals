var express = require("express");
var router = express.Router();
var userObj = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var validator = require('validator');


// api to register user 
router.post('/signup', function (req, res) {

    const valid = validator.isEmail(req.body.email)

    if (valid == false) {
        var message = { "Success": 0, "Message": "Please enter a valid email." };
        res.send(message)
    }


    userObj.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            var message = { "Success": 0, "Message": "Email already exists" };
            res.send(message)
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            req.body.password = hash;

                            userObj.create(req.body, function (err) {
                                if (err) {
                                    var message = { "Success": 0, "Message": "Some error found" };
                                    res.send(message)
                                }
                                else {
                                    var message = { "Success": 1, "User": req.body };
                                    res.send(message)

                                }
                            });




                        }
                    });
                }
            });
        }
    });
});



// api to login user
router.post('/login', function (req, res) {

    const valid = validator.isEmail(req.body.email)

    if (valid == false) {
        var message = { "Success": 0, "Message": "Please enter a valid email." };
        res.send(message)
    }

    userObj.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            var message = { "Success": 0, "Message": "User does not exists." };
            res.send(message)
        } else {

            // console.log(bcrypt.compare(req.body.password, user.password))
            // var message = { "Success": 1, "User": user };
            // res.send(message)

            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            name: user.name,
                            id: user._id,
                            email: user.email
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    Success: 1,
                                    token: `${token}`
                                })
                            }
                        })
                    }
                    else {
                        res.json({
                            Success: 0,
                            Message: 'Invalid Credentials'
                        })
                    }
                })



        }
    })

});


module.exports = router;