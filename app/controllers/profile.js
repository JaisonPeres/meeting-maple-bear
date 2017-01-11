module.exports.profile = function(app, req, res){
  if(req.session.auth !== true){
    res.redirect('/login');
    return;
  }

  var connection = app.config.dbConnection();
  var UsersDAO = new app.app.models.UsersDAO(connection);

  var user = req.session.user;

  UsersDAO.getUserProfile(user, req, res);
}
