var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

app.set('port', (process.env.PORT || 5000));
//MODIFICANDO A ENGINE DE VIEWS PARA EJS
app.use(express.static('./app/public'));
app.set('view engine', 'ejs');
app.set('views','./app/views');


//Implementar o Body Parser como midleware...
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({
  secret: 'HawK@la290120',
  resave: false,
  saveUninitialize: false
}));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;
