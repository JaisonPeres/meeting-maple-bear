module.exports = function(app){
  app.get('/login', function(req, res){
    app.app.controllers.signin.sign(app, req, res);
  });
  app.post('/login', function(req, res){
    app.app.controllers.signin.signin(app, req, res);
  });
}
