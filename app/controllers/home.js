module.exports.index = function(app, req, res){
  if(req.session.auth !== true){
    res.redirect('/login');
    return;
  }
  res.render("public/index");
}
