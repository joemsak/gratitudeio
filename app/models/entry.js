var firebase = require("firebase"),
    database = require("../database"),
    _ = require("lodash");

function Entry() {
  this.getAll = function(callback) {
    database.ref('gratitudes')
      .orderByChild("gratefulOn DESC")
      .once('value')
      .then(function(snapshot) {
        var entries = [];

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
        callback(entriesByDate);
      });
  }

  this.post = function(req, callback) {
    if (req.body.From === "+15179445230") {
      var id = database.ref().child('gratitudes').push().key;

      database.ref("/gratitudes/" + id).set({
        text: req.body.Body,
        gratefulOn: firebase.database.ServerValue.TIMESTAMP,
      });
    }

    callback();
  }

  return this;
}

module.exports = new Entry();
