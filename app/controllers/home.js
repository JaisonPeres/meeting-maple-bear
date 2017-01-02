module.exports.index = function(app, req, res){
  if(req.session.auth){
    res.render("public/index");
  }else{
    res.redirect('/login');
  }
}
