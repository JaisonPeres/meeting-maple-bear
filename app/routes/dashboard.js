module.exports = function(app){
  app.get('/dashboard', function(req, res){
    app.app.controllers.dashboard.dashboard(app, req, res);
  });
}
