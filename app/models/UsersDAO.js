function UsersDAO(connection){
  this._connection = connection();
}
UsersDAO.prototype.getUser = function(user, req, res){
  this._connection.open( function(err, mongoClient){
    if(err){
      console.log(err);
      return;
    }
    mongoClient.collection('users', function(err, collection){
      if(err){
        console.log(err);
        return;
      }
      collection.find({username_user: user}).toArray(function(err, result){
        if(result[0] != undefined){
          res.render('user/profile', {user:result});
          mongoClient.close();
        }else{
          res.redirect('/login');
        }
      });
    });
  });
}
UsersDAO.prototype.getUsers = function(filter, req, res){

}
/* Cadastrar novo Usuário
*/
UsersDAO.prototype.insertUser = function(user){
    this._connection.open( function(err, mongoClient){
      if(err){
        console.log(err);
        return;
      }
      mongoClient.collection('users', function(err, collection){
        if(err){
          console.log(err);
          return;
        }
        collection.insert(user);
        mongoClient.close();
      });
    });
}
/* Autenticar usuário
*/
UsersDAO.prototype.authUser = function(user, req, res){
  this._connection.open( function(err, mongoClient){
    if(err){
      console.log(err);
      return;
    }
    mongoClient.collection('users', function(err, collection){
      if(err){
        console.log(err);
        return;
      }
      collection.find(user).toArray(function(err, result){
        if(result[0] != undefined){
          req.session.auth = true;
          req.session.user = result[0].username_user;
          req.session.fname = result[0].fname_user;
          req.session.email = result[0].email_user;
        }
        mongoClient.close();
        if(req.session.auth){
          res.redirect('/');
        }else{
          res.redirect('/login');
        }
      });
    });
  });
}

module.exports = function(){
  return UsersDAO;
}
