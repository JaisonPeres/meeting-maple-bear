module.exports = function(app){
  app.get('/', function(req, res){;//HOME
    app.app.controllers.home.index(app, req, res);
  });
};
