module.exports.sign = function (app, req, res) {
    res.render('public/login', {validation: {}});
}
module.exports.signin = function (app, req, res) {
  var signinData = req.body;

  req.assert('username_user', 'Nome de usuário é obrigatório').notEmpty();
  req.assert('passwd_user', 'Senha é obrigatória').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('public/login', {validation: errors});
    return;
  }
  var connection = app.config.dbConnection;
  var UsersDAO = new app.app.models.UsersDAO(connection);
  UsersDAO.authUser(signinData, req, res);
}
