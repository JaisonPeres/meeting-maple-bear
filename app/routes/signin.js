module.exports = function(app){
  app.get(__dirname+'/login', function(req, res){
    app.app.controllers.signin.sign(app, req, res);
  });
  app.post(__dirname+'/login', function(req, res){
    app.app.controllers.signin.signin(app, req, res);
  });
}
