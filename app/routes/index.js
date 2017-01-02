module.exports = function(app){
  app.get('/', function(req, res){;
    app.app.controllers.home.index(app, req, res);
    //res.send('Home, até aqui tudo bem');
  });
};
