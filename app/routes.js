var express = require("express"),
    path = require("path"),
    router = express.Router();

router.get("/", function(req, res) {
  res.render('pages/index');
});

router.get("/about", function(req, res) {
  res.render('pages/about');
});

router.get("/contact", function(req, res) {
  res.render('pages/contact');
});

router.post("/contact", function(req, res) {
  res.send("Thanks for contacting us, " + req.body.name + "!");
  console.log(req.body.message);
});

module.exports = router;
