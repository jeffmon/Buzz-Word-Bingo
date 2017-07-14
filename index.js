const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
var collection = [];

app.use(express.static("./public/"))
app.use(bodyParser.urlencoded());

function receiveWord(obj) {
  var number = Number(obj["points"]);
  obj["points"] = number;
  collection.push(obj);
  res.json({
    "success": true
  });
}

app.get("/", (req, res) => {
  res.send("./index.html");
})

app.get("/buzzwords", (req, res) => {
  res.json(collection);
})

app.route("/buzzword")
  .post((req, res) => {
    if (collection.some(function(obj) {
        return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
      })) {
      res.json({
        "success": false
      });
    } else {
      var number = Number(req.body["points"]);
      req.body["points"] = number;
      collection.push(req.body);
      console.log(collection);
      res.json({
        "success": true
      });
    }
  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  })

const server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
})
