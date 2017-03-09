module.exports = function(app){
  app.get('/configuracoes', function(req, res){
    app.app.controllers.settings.settings(app, req, res);
  });
}
