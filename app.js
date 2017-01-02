var app = require('./config/server');

app.listen(app.get('port'), function(){
  console.log('Servidor Inicializado na porta: ' + app.get('port'));
});
