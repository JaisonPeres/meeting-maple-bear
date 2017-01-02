module.exports.profile = function(app, req, res){
  var sql = 'select * from user';
  var connection = app.config.dbConnection();
  connection.query(sql, function(error, result){
    if(req.session.auth){
      res.render("user/profile", {user : result});
    }else{
      res.redirect('/login');
    }
  });
}
