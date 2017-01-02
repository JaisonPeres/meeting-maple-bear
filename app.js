var app = require('./config/server');

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
  console.log('Servidor Inicializado na porta: '+app.get('port'));
});
