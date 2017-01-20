var firebase = require("firebase"),
    database = require("./database");

var postEntries = function(req, callback) {
  if (req.body.From === "+15179445230") {
    var id = database.ref().child('gratitudes').push().key;

    database.ref("/gratitudes/" + id).set({
      text: req.body.Body,
      gratefulOn: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  callback();
}

module.exports = postEntries;
