module.exports = function(app){
  app.get('/cadastro', function(req, res){
    app.app.controllers.signup.sign(app, req, res);
  });
  app.post('/cadastrar', function(req, res){
    app.app.controllers.signup.signup(app, req, res);
  });
}
