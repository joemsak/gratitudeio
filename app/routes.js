if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    twilio = require("twilio"),
    router = express.Router();

router.get("/", function(req, res) {
  res.status(404).send("404 - Resource not found.")
});

router.post("/sms", function(req, res) {
  var accountSid = process.env.TWILIO_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      client = new twilio.RestClient(accountSid, authToken);

  console.log(req);

  client.messages.create({
    body: req.body.Body,
    to: '+15179445230',  // Text this number
    from: '+15175805672' // From a valid Twilio number
  }, function(err, message) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
