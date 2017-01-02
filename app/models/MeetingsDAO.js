function MeetingsDAO(connection){
  this._connection = connection;
}
//Listar Reuniões
MeetingsDAO.prototype.getMeetings = function(callback){
  //this._connection.query('select * from meeting', callback);
}
//Detalhar Reunião
MeetingsDAO.prototype.getMeeting = function(id, callback){
  //this._connection.query('select * from meeting where id_meeting = ?', id, callback);
}
//Salvar nova Reunião
MeetingsDAO.prototype.saveMeeting = function(meeting, callback){
  //this._connection.query('insert into meeting set ?', meeting, callback);
}
module.exports = function(){
  return MeetingsDAO;
}
