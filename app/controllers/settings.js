module.exports.settings = function(app, req, res){
    if(req.session.auth !== true){
      res.redirect('/login');
      return;
    }
    res.render("admin/settings");
}
