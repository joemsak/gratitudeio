if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    Entry = require("./models/entry"),
    router = express.Router();

router.get("/", function(req, res) {
  res.status(404).send("404 - Resource not found.")
});

router.get("/gratitudes", function(req, res) {
  Entry.getAll(function(entries) {
    res.render('pages/entries', { entries: entries });
  });
});

router.post("/sms", function(req, res) {
  Entry.post(req, function() {
    res.end();
  });
});

module.exports = router;
