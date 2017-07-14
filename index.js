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
  res.json({
    "success": true
  });
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
    var isWordThere = collection.some(function(obj) {
      return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
    });
    if (isWordThere) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i]["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()) {
          collection[i]["heard"] = true;
          score += collection[i]["points"];
        }
      }
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
    if(isWordThere){
      var location = collection.findIndex(function(obj){return obj["buzzWord"] === req.body["buzzWord"];
      })
      collection.splice(location, 1);
      console.log(collection);
      res.json({
        "success": true
      })
    }
  })





const server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
})
