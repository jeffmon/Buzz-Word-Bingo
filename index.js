const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
var collection = [];
var score = 0;

app.use(express.static("./public/"))
app.use(bodyParser.urlencoded());

function receiveWord(obj) {
  var number = Number(obj["points"]);
  obj["points"] = number;
  collection.push(obj);
  console.log(collection);
}

function putWord(obj) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i]["buzzWord"].toLowerCase() === obj["buzzWord"].toLowerCase()) {
      collection[i]["heard"] = true;
      score += collection[i]["points"];
    }
  }
}

function deleteWord(obj){
  var location = collection.findIndex(function(o) {
    return o["buzzWord"] === obj["buzzWord"];
  })
  collection.splice(location, 1);
  console.log(collection);
}

app.get("/", (req, res) => {
  res.send("./index.html");
})

app.get("/buzzwords", (req, res) => {
  res.json({
    "buzzWords": collection
  });
})

app.route("/buzzword")
  .post((req, res) => {
    var isWordThere = collection.some(function(obj) {
      return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
    })
    if (isWordThere) {
      res.json({
        "success": false
      });
    } else {
      receiveWord(req.body);
      res.json({
        "success": true
      });
    }
  })
  .put((req, res) => {
    var isWordThere = collection.some(function(obj) {
      return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
    });
    if (isWordThere) {
      putWord(req.body);
    }
    res.json({
      "success": true,
      "newScore": score
    })
  })
  .delete((req, res) => {
    var isWordThere = collection.some(function(obj) {
      return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
    });
    if (isWordThere) {
      deleteWord(req.body);
      res.json({
        "success": true
      })
    } else{
      res.json({
        "success": false
      })
    }
  })

const server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
})
