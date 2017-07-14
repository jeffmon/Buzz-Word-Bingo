const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
var collection = [];

app.use(express.static("./public/"))
app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("./index.html");
})

app.get("/buzzwords", (req, res) => {

})

app.route("/buzzword")
  .post((req, res) => {
    collection.push(req.body)
    console.log(collection)
    res.send({
      "success": true
    });
  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  })

const server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
})
