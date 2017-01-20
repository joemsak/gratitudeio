var express = require("express"),
    expressLayouts = require("express-ejs-layouts"),
    bodyParser = require("body-parser"),
    router = require("./app/routes"),
    app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/flag-icon-css"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

