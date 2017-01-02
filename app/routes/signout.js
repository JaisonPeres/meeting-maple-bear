module.exports = function(app){
  app.get('/sair', function(req, res){
    app.app.controllers.signout.signout(app, req, res);
  });
}
