module.exports = function(application){
  application.get('/', function(req, res){;//HOME
    application.app.controllers.home.index(app, req, res);
    //res.send('Home, até aqui tudo bem');
  });
};
