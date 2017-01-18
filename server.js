var express = require("express"),
    app = express(),
    port = 8080;

app.listen(port, function() {
  console.log("App started on port " + port);
});

app.get("/", function(req, res) {
  res.send("Hello, world!");
});

app.get("/about", function(req, res) {
  res.send("About me");
});

app.get("/contact");
app.post("/contact");
