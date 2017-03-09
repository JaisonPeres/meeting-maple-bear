module.exports = function(app){
  app.get('/perfil', function(req, res){
    app.app.controllers.profile.profile(app, req, res);
  });
}
