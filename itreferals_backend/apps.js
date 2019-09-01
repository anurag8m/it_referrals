 var express = require("express");
    var app  = express();
    var bodyParser = require("body-parser");
    var mongoose = require("mongoose");

    mongoose.set('useCreateIndex', true)
    app.use(bodyParser.urlencoded({useNewUrlParser: true}));
    // app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());
    app.set("view engine","ejs");

   app.get("/",function(req, res){
           res.send("hello") ;
    });
   
     mongoose.connect("mongodb+srv://anuruddh:anuruddh@cluster0-i0dld.azure.mongodb.net/itreferals_Dev?retryWrites=true&w=majority",{useNewUrlParser: true})
    .then(console.log("MongoDB COnnected"))
    .catch(err=>console.log(err));

    /////////********** On LOCAL HOST **************///////
    // // on local
    var server = app.listen(3000, function () {
     console.log("Listening on port %s...", server.address().port);
    });