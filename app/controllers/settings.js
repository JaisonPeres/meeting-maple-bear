module.exports.settings = function(app, req, res){
    if(req.session.auth){
        res.render("admin/settings");
    }else{
      res.redirect('/login');
    }
}
