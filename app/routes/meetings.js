module.exports = function(app){
  /* Retorna página de reuniões
  */
  app.get('/reunioes', function(req, res){
    app.app.controllers.meetings.meetings(app, req, res);
  });
  /* Retorna página de uma única reunião
  */
  app.get('/reuniao/:reuniao_id', function(req, res){;
    var id = req.params.reuniao_id;
    app.app.controllers.meetings.meeting(app, id, req, res);
  });
  /* Retorna página de cadastro de nova reunião
  */
  app.get("/reunioes/nova", function(req, res){
    app.app.controllers.meetings_admin.form_new_meeting(app, req, res);
  });
  /* Trata cadastro de uma reunião
  */
  app.post('/reunioes/salvar', function(req, res){
    app.app.controllers.meetings_admin.meeting_save(app, req, res);
  });
}
