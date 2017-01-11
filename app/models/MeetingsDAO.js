function MeetingsDAO(connection){
  this._connection = connection;
}
//Listar Reuniões
MeetingsDAO.prototype.getMeetings = function(user, req, res){
  //this._connection.query('select * from meeting', callback);
  this._connection.open( function(err, mongoClient){
    if(err){
      console.log(err);
      return;
    }
    mongoClient.collection('meetings', function(err, collection){
      if(err){
        console.log(err);
        return;
      }
      collection.find({user: user}).toArray(function(err, result){
        res.render('user/meetings', {meetings:result});
        mongoClient.close();
      });
    });
  });
}
//Detalhar Reunião
MeetingsDAO.prototype.getMeeting = function(code_meeting, req, res){
  //this._connection.query('select * from meeting where id_meeting = ?', id, callback);
  this._connection.open( function(err, mongoClient){
    if(err){
      console.log(err);
      return;
    }
    mongoClient.collection('meetings', function(err, collection){
      if(err){
        console.log(err);
        return;
      }
      collection.find({code_meeting: code_meeting}).toArray(function(err, result){
        res.render('user/meeting', {meeting:result});
        mongoClient.close();
      });
    });
  });
}
//Salvar nova Reunião
MeetingsDAO.prototype.saveMeeting = function(meeting){
  //this._connection.query('insert into meeting set ?', meeting, callback);
  this._connection.open( function(err, mongoClient){
    if(err){
      console.log(err);
      return;
    }
    mongoClient.collection('meetings', function(err, collection){
      if(err){
        console.log(err);
        return;
      }
      collection.insert(meeting);
      mongoClient.close();
    });
  });
}
module.exports = function(){
  return MeetingsDAO;
}
