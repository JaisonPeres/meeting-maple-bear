module.exports.meetings = function(app, req, res){
  var connection = app.config.dbConnection();
  var meetingsDAO = new app.app.models.MeetingsDAO(connection);
  meetingsDAO.getMeetings(app, req, res, function(error, result){
    if(req.session.auth){
      res.render("user/meetings", {meeting : result});
    }else{
      res.redirect('/login');
    }
  });
}
module.exports.meeting = function(app, id, req, res){
  var connection = app.config.dbConnection();
  var meetingDAO = new app.app.models.MeetingsDAO(connection);
  meetingDAO.getMeeting(id, function(error, result){
      res.render("user/meeting", {meeting : result});
  });
}
