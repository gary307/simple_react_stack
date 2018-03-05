var express = require("express");
var router = express.Router();
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var router = require("./routes/routes.js");
var bodyParser = require("body-parser");

app.set("view engine", "html");
app.use(express.static(__dirname + "./../dist")); //serves the index.html
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.set("port", process.env.PORT || 3001);

app.listen(3001, function() {
  console.log("node is running on 3001");
});

//database connection for mongodb
// mongoose.connect("mongodb+srv://Gary:apy9bct!@test0-f69bm.mongodb.net/test");
// mongoose.connect("mongodb://localhost/mern-starter");

app.use("/", router);

app.get("/*", function(req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

module.exports = app;
