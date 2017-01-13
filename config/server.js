var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var nodemailer = require("nodemailer");
var moment = require('moment');
var nodemailer = require('nodemailer');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('host', '192.168.0.22');
app.set('moment', moment);
app.set('nodemailer', nodemailer);
//MODIFICANDO A ENGINE DE VIEWS PARA EJS
app.use(express.static('./app/public'));
app.set('view engine', 'ejs');
app.set('views','./app/views');

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

  var mail = app.get('nodemailer');
  // create reusable transporter object using the default SMTP transport
  var transporter = mail.createTransport('smtps://jaisoncperes@gmail.com:bbwggaqnvypetqeo@smtp.gmail.com');

  // setup e-mail data with unicode symbols

  var moment = app.get('moment');

  time = moment().locale('pt-BR').format('LTS');
  date = moment().locale('pt-BR').format('L');
  html = '<p>O servidor do sistema maple bear meeting foi reiniciado.</p>';
  html += '<p>Data: '+date+' às '+time+'</p>';

  var mailOptions = {
      from: '"Maple Bear" <meeting@maplebear.com>', // sender address
      to: 'jaison@360iview.com', // list of receivers
      subject: 'Servidor Maple Bear Reiniciado -'+date+' - '+time, // Subject line
      text: 'O servidor do sistema maple bear meeting foi reiniciado.', // plaintext body
      html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Mensagem enviada: ' + info.response);
  });

module.exports = app;
