if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    firebase = require("firebase"),
    _ = require("lodash"),
    router = express.Router();

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
};

firebase.initializeApp(config);

var database = firebase.database();

router.get("/", function(req, res) {
  res.status(404).send("404 - Resource not found.")
});

router.get("/gratitudes", function(req, res) {
  var entries = [];

  database.ref('gratitudes')
    .orderByChild("gratefulOn DESC")
    .once('value')
    .then(function(snapshot) {
      if (snapshot.val() !== null) {
        snapshot.forEach(function(entry) {
          entries.push({
            gratefulOn: new Date(entry.val().gratefulOn).toDateString(),
            text: entry.val().text,
          });
        });
      }

      entries.reverse();
      var entriesByDate = _.groupBy(entries, function(e) { return e.gratefulOn });
      res.render('pages/entries', { entries: entriesByDate });
    });
});

router.post("/sms", function(req, res) {
  if (req.body.From === "+15179445230") {
    var id = database.ref().child('gratitudes').push().key;

    database.ref("/gratitudes/" + id).set({
      text: req.body.Body,
      gratefulOn: firebase.database.ServerValue.TIMESTAMP,
    });

    res.end();
  } else {
    res.end();
  }
});

module.exports = router;
