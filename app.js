var app = require('./config/server');

app.listen(app.get('port'), app.get('host'), function(){
  console.log('Servidor Inicializado, acesse em: http://' + app.get('host') + ':' + app.get('port'));
});
