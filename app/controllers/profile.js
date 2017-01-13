module.exports.profile = function(app, req, res){
  if(req.session.auth !== true){
    res.redirect('/login');
    return;
  }
  var connection = app.config.dbConnection();
  var userDAO = new app.app.models.UsersDAO(connection);
  var user = req.session.user;
  userDAO.getUser(user, req, res);
}
