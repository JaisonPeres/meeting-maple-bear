module.exports = function(app){
  app.get(__dirname+'/login', function(req, res){
    //app.app.controllers.signin.sign(app, req, res);
    res.send('até aqui ok');
  });
  app.post(__dirname+'/login', function(req, res){
    app.app.controllers.signin.signin(app, req, res);
  });
}
