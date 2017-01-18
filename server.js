var express = require("express"),
    expressLayouts = require("express-ejs-layouts"),
    bodyParser = require("body-parser"),
    app = express(),
    port = 8080,
    router = require("./app/routes");

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded());

app.use('/', router);

app.use(express.static(__dirname + "/public"));

app.listen(port, function() {
  console.log("App started on port " + port);
});
