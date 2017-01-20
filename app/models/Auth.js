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
    var authToken = null;

    database.ref('auth_codes')
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val() !== null) {
          snapshot.forEach(function(code) {
            if (req.body.code === code.val().code &&
                  req.body.phoneNumber === code.val().phoneNumber &&
                    (Date.now() - (2 * 60)) > code.val().createdAt)
              authToken = code.val().authToken;
          });
        }

        if (authToken !== null) {
          callback(200, { authToken: authToken });
        } else {
          callback(403, { error: "Invalid code", authToken: "" });
        }
      });
  }
}

module.exports = new Auth();
