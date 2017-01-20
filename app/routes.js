if (process.env.NODE_ENV === "development")
  require('dotenv').config();

var express = require("express"),
    Entry = require("./models/entry"),
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
  var crypto = require('crypto'), 
      secret = process.env.CRYPTO_SECRET,
      hash = crypto.createHmac('sha256', secret)
                    .update(Date.now().toString())
                    .digest('hex');

  var code = hash.slice(0,7);

  var accountSid = process.env.TWILIO_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      client = require('twilio')(accountSid, authToken);

  client.messages.create({ 
      to: "+1" + req.body.phoneNumber,
      from: "+15175805672",
      body: "This is your auth code: " + code,
  }, function(err, message) { 
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
  });
});

module.exports = router;
