
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var crypt = require('bcryptjs');
var token = require('jsonwebtoken');


mongoose.set('useCreateIndex', true)
app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(cors());

app.get("/", function (req, res) {
        res.send("hello");
});

//import model and route for Category
var categoryRoute = require("./routes/CategoryRoute");
app.use("/", categoryRoute);

var userRoute = require("./routes/UserRoute");
app.use("/", userRoute);

var jobRoute = require("./routes/JobRoute");
app.use("/", jobRoute);

mongoose.connect("mongodb+srv://anuruddh:anuruddh@cluster0-i0dld.azure.mongodb.net/itreferals_Dev?retryWrites=true&w=majority", { useNewUrlParser: true })
        .then(console.log("MongoDB Connected"))
        .catch(err => console.log(err));

/////////********** On LOCAL HOST **************///////
// // on local
var server = app.listen(5000, function () {
        console.log("Listening on port %s...", server.address().port);
});