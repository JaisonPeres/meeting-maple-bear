module.exports = function(app){
  app.get(__dirname+'/', function(req, res){;//HOME
    app.app.controllers.home.index(app, req, res);
    //res.send('Home, até aqui tudo bem');
  });
};
