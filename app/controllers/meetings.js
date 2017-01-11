module.exports.meetings = function(app, req, res){

  if(req.session.auth !== true){
    res.redirect('/login');
    return;
  }

  var connection = app.config.dbConnection();
  var meetingsDAO = new app.app.models.MeetingsDAO(connection);

  var user = req.session.user;

  meetingsDAO.getMeetings(user, req, res);
}
module.exports.meeting = function(app, code_meeting, req, res){

  if(req.session.auth !== true){
    res.redirect('/login');
    return;
  }

  var connection = app.config.dbConnection();
  var meetingDAO = new app.app.models.MeetingsDAO(connection);

  meetingDAO.getMeeting(code_meeting, req, res);
}
module.exports.form_new_meeting = function(app, req, res){
  if(req.session.auth){
    res.render("admin/form_new_meeting", {validacao:{}, meeting:{}});
  }else{
    res.redirect('/login');
  }
}
module.exports.meeting_save = function(app, req, res){
  var meeting = req.body;

  /* Express Validator - Validando os dados do formulário
  */
  req.assert('title_meeting', 'Título Obrigatório').notEmpty();
  req.assert('title_meeting', 'Título deve ter entre 10 e 100 caracteres').len(10,100);
  req.assert('date_event_meeting', 'Data da Reunião é Obrigatória').notEmpty();
  req.assert('note_meeting', 'A descrição da reunião deve ter entre 10 e 100 caracteres').len(10,100);
  /* Recebe os erros do validator
  */
  var errors = req.validationErrors();
  var user = req.session.user;

  meeting.user = user;
  
  if(errors){
    //res.redirect('/reunioes/nova');
    console.log(errors);
    /* Renderiza no formulário os erros e os próprios dados preenchidos
    */
    res.render('admin/form_new_meeting', {validacao: errors, meeting: meeting});
  }else{
    /* Se as validações forem positivas será instanciado um novo objeto MeetingsDAO que irá gravar os dados no banco
    */
    var connection = app.config.dbConnection();
    var meetingDAO = new app.app.models.MeetingsDAO(connection);
    meetingDAO.saveMeeting(meeting);
    res.redirect('/reunioes');
  }
}
