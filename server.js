var express = require("express"),
    bodyParser = require("body-parser"),
    router = require("./app/routes"),
    app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

