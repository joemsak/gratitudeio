if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    firebase = require("firebase"),
    router = express.Router();

router.get("/", function(req, res) {
  res.status(404).send("404 - Resource not found.")
});

router.post("/sms", function(req, res) {
  if (req.body.From !== "+15179445230")
    res.end();

  var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  };
  firebase.initializeApp(config);

  var database = firebase.database(),
      id = database.ref().child('gratitudes').push().key;

  database.ref("/gratitudes/" + id).set({
    text: req.body.Body,
  });

  res.end();
});

module.exports = router;
