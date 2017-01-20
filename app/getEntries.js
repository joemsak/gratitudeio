var database = require("./database"),
    _ = require("lodash");

var getEntries = function(callback) {
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

module.exports = getEntries;
