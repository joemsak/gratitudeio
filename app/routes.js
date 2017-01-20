if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    Entry = require("./models/entry"),
    Auth = require("./models/Auth"),
    router = express.Router();

router.use("/entries", function (req, res, next) {
  res.render("pages/auth");
  next()
})

router.get("/", function(req, res) {
  res.status(404).send("404 - Resource not found.")
});

router.get("/entries", function(req, res) {
  Entry.getAll(function(entries) {
    res.render('pages/entries', { entries: entries });
  });
});

router.get("/sudo/entries", function(req, res) {
  Entry.getAll(function(entries) {
    res.render('pages/entries', { entries: entries });
  });
});

router.post("/sms", function(req, res) {
  Entry.post(req, function() {
    res.end();
  });
});

router.post('/auth', function(req, res) {
  Auth.sendCode(req, function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
  });
});

router.post('/auth/code', function(req, res) {
  Auth.verifyCode(req, function(statusCode, data) {
    res.status(statusCode).json(data);
  });
});

module.exports = router;
