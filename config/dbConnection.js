// var mysql = require('mysql');
//
// var connMySQL = function(){
//   //console.log('Conexao com banco estabelecida');
//   return mysql.createConnection({
//     host: 'localhost',
//     user : 'root',
//     password: '',
//     database: 'mb_meeting'
//   });
// }
// module.exports = function(){
//   //console.log('Autoload carregou conexao com o BD');
//   return connMySQL;
// }

/* Importar o mongodb
*/
var mongo = require('mongodb');

var connMongoDB = function(){
  var db = new mongo.Db(
    'bear-meeting',
    new mongo.Server(
        'localhost', //endereço
        27017,
        {}
    ),
    {}
  );
  return db;
}
module.exports = function(){
  return connMongoDB;
}
