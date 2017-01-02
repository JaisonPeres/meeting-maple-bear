module.exports.dashboard = function (app, req, res) {
    if(req.session.auth){
      res.render("admin/dashboard");
    }else{
      res.redirect('/login');
    }
}
