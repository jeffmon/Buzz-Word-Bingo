const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
var collection = [];
var score = 0;

app.use(express.static("./public/"))
app.use(bodyParser.urlencoded());

function getWords() {
  var wordsOnly = [];
  for (var i = 0; i < collection.length; i++) {
    wordsOnly.push(collection[i]["buzzWord"]);
  }
  return wordsOnly;
}

function receiveWord(obj) {
  var number = Number(obj["points"]);
  obj["points"] = number;
  obj["heard"] = false;
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

function putAgain(obj) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i]["buzzWord"].toLowerCase() === obj["buzzWord"].toLowerCase()) {
      if (collection[i]["heard"] === true) {
        return false;
      } else {
        return true;
      }
    }
  }
}

function deleteWord(obj) {
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
    "buzzWords": getWords()
  });
})

app.route("/buzzword")
  .post((req, res) => {
    var isWordThere = collection.some(function(obj) {
      return obj["buzzWord"].toLowerCase() === req.body["buzzWord"].toLowerCase()
    })
    if (isWordThere || collection.length === 5) {
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
    if (isWordThere && putAgain(req.body)) {
      putWord(req.body);
      res.json({
        "success": true,
        "newScore": score
      })
    } else{
      res.json({
        "success": false
      })
    }

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
    } else {
      res.json({
        "success": false
      })
    }
  })

const server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
})
