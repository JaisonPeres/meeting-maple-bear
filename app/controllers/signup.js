module.exports.sign = function (app, req, res) {
    res.render("public/signup", {validation: {}, signupData:{}});
}
module.exports.signup = function (app, req, res) {
  var signupData = req.body;
  req.assert('fname_user', 'Nome não pode ser vazio').notEmpty();
  req.assert('email_user', 'Email não pode ser vazio').notEmpty();
  req.assert('passwd_user', 'Senha não pode ser vazia').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('public/signup', {validation: errors, signupData: signupData});
    return;
  }

  var connection = app.config.dbConnection;
  var UsersDAO = new app.app.models.UsersDAO(connection);

  UsersDAO.insertUser(signupData);

  res.redirect('/');
}
