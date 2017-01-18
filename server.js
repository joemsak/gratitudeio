var express = require("express"),
    expressLayouts = require("express-ejs-layouts"),
    bodyParser = require("body-parser"),
    app = express(),
    router = require("./app/routes");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded());

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

