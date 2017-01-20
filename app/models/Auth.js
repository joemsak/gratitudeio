var crypto = require('crypto'),
    cookies = require("js-cookie"),
    firebase = require("firebase"),
    database = require("../database"),
    accountSid = process.env.TWILIO_SID,
    authToken = process.env.TWILIO_AUTH_TOKEN,
    client = require('twilio')(accountSid, authToken);

function Auth() {
  this.sendCode = function(req, callback) {
    var secret = process.env.CRYPTO_SECRET,
        hash = crypto.createHmac('sha256', secret)
                      .update(Date.now().toString())
                      .digest('hex');

    var code = hash.slice(0,7),
        id = database.ref().child("auth_codes").push().key;

    database.ref("/auth_codes/" + id).set({
      code: code,
      phoneNumber: req.body.phoneNumber,
      authToken: hash.slice(8,40),
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

    client.messages.create({ 
        to: "+1" + req.body.phoneNumber,
        from: "+15175805672",
        body: "This is your auth code: " + code,
    }, function(err, message) { 
      callback(err);
    });
  }

  this.verifyCode = function(req, callback) {
    var codes = [];

    database.ref('auth_codes')
      .orderByChild("createdAt")
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val() !== null) {
          snapshot.forEach(function(code) {
            codes.push({
              code: code.val().code,
              phoneNumber: code.val().phoneNumber,
              authToken: code.val().authToken,
              createdAt: code.val().createdAt,
            });
          });
        }

        var oneMinuteAgo = Date.now() - 60 * 1000;
        var matchedCode = codes.reverse().find(function(c) {
          return req.body.code === c.code &&
                   req.body.phoneNumber === c.phoneNumber &&
                     c.createdAt > oneMinuteAgo;
        });

        if (matchedCode) {
          callback(200, { authToken: matchedCode.authToken });
        } else {
          callback(403, { error: "Invalid code" });
        }
      });
  }
}

module.exports = new Auth();
