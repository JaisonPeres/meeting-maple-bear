module.exports.signout = function(app, req, res){
  req.session.destroy( function(err){
    res.redirect('/login');
  });
}
