module.exports = function(app){
  /* Retorna página de reuniões
  */
  app.get('/reunioes', function(req, res){
    var type = 'card';
    app.app.controllers.meetings.meetings(app, req, res, type);
  });
  app.get('/reunioes/list', function(req, res){
    var type = 'list';
    app.app.controllers.meetings.meetings(app, req, res, type);
  });
  /* Retorna página de uma única reunião
  */
  app.get('/reuniao/:code_meeting', function(req, res){;
    var code_meeting = req.params.code_meeting;
    app.app.controllers.meetings.meeting(app, code_meeting, req, res);
  });

  app.get('/reuniao/enviar/:code_meeting', function(req, res){;
    var code_meeting = req.params.code_meeting;
    app.app.controllers.meetings.reinviteMeeting(app, code_meeting, req, res);
  });

  app.get('/check/reuniao/:code_meeting/:status_meeting', function(req, res){;
    var code_meeting = req.params.code_meeting;
    var status_meeting = req.params.status_meeting;
    app.app.controllers.meetings.confirmMeeting(app, code_meeting, status_meeting, req, res);
  });
  /* Retorna página de cadastro de nova reunião
  */
  app.get("/reunioes/nova", function(req, res){
    app.app.controllers.meetings.form_new_meeting(app, req, res);
  });
  /* Trata cadastro de uma reunião
  */
  app.post('/reunioes/salvar', function(req, res){
    app.app.controllers.meetings.meeting_save(app, req, res);
  });
}
