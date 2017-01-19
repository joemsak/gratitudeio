if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    twilio = require("twilio"),
    router = express.Router();

router.get("/", function(req, res) {
  res.render('pages/index');
});

router.post("/sms", function(req, res) {
  var accountSid = process.env.TWILIO_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      client = new twilio.RestClient(accountSid, authToken);

  client.messages.create({
    body: req.body,
    to: '+15179445230',  // Text this number
    from: '+15175805672' // From a valid Twilio number
  }, function(err, message) {
    res.status(500).send(message.sid).end();
  });

  res.status(200).end();
});

module.exports = router;
