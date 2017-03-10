function MeetingsDAO(connection){
  this._connection = connection;
}
//Listar Reuniões
MeetingsDAO.prototype.getMeetings = function(user, req, res, type){
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

        var viewMeetings = 'user/meetings';

        if(type == 'list'){
          viewMeetings = 'user/meetings_list';
        }

        res.render(viewMeetings, {meetings:result});
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
MeetingsDAO.prototype.confirmMeeting = function(app, code_meeting, req, res){
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

      var status = {
        icon: 'fa-check-square',
        label: 'Confirmada',
        btn: 'success',
        value: 2,
        color: '#5cb85c'
      };

      collection.update({code_meeting: code_meeting},{ $set:{status_meeting: status}},{upsert: false});
      mongoClient.close();
      res.redirect('/reunioes');
    });
  });
}
//Salvar nova Reunião
MeetingsDAO.prototype.saveMeeting = function(app, meeting){

  var moment = app.get('moment');
  meeting.date_event_meeting = moment(meeting.date_event_meeting).locale('pt-BR').format('L');
  meeting.time_init_event_meeting = moment(meeting.time_init_event_meeting,'HH:mm').locale('pt-BR').format('LTS');
  meeting.time_final_event_meeting = moment(meeting.time_final_event_meeting,'HH:mm').locale('pt-BR').format('LTS');
  meeting.date_meeting = moment().locale('pt-BR').format('L');
  meeting.time_meeting = moment().locale('pt-BR').format('LTS');

  meeting.status_meeting = {
    icon: 'fa-square-o',
    label: 'Cadastrada',
    btn: 'default',
    value: 1,
    color: '#999'
  };

  meeting.code_meeting = meeting.class_meeting+''+Math.floor((Math.random() * 10000) + 1);

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
MeetingsDAO.prototype.inviteMeeting = function(app, meeting, req, res){
  var mail = app.get('nodemailer');
  // create reusable transporter object using the default SMTP transport
  var transporter = mail.createTransport('smtps://jaisoncperes@gmail.com:bbwggaqnvypetqeo@smtp.gmail.com');

  // setup e-mail data with unicode symbols

  var moment = app.get('moment');

  time = moment().locale('pt-BR').format('LTS');

  date = moment().locale('pt-BR').format('L');

  if(meeting.date_meeting == date){
    date = 'Hoje';
  }

  var confirm_link = app.get('host')+':'+app.get('port')+'/check/reuniao/'+meeting.code_meeting+'/'+meeting.status_meeting.value;

  html = '<h3>Nova Reunião - '+meeting.title_meeting+'</h3>';
  html = '<h2>Detalhes</h2>';
  html = '<ul>';
    html += '<li><b>Título:</b> '+meeting.title_meeting+'</li>';
    html += '<li><b>Nota:</b> '+meeting.note_meeting+'</li>';
    html += '<li><b>Usuário:</b> '+meeting.user+'</li>';
    html += '<li><b>Data da Reunião:</b> '+meeting.date_event_meeting+'</li>';
    html += '<li><b>Período: </b> '+meeting.time_init_event_meeting+' às '+meeting.time_final_event_meeting+'</li>';
    html += '<li><b>Turma:</b> '+meeting.class_meeting+'</li>';
    html += '<li><b>Criada em:</b> '+meeting.date_meeting+' às '+meeting.time_meeting+'</li>';
    html += '<li><b>Confirmar:</b> '+confirm_link+'</li>';
  html += '</ul>';

  var mailOptions = {
      from: 'Maple Bear <meeting@maplebear.com.br>', // sender address
      to: 'jaisoncperes@gmail.com'+','+meeting.emails_meeting, // list of receivers
      subject: 'Nova Reunião - ' + meeting.title_meeting + ' - ' + date + ' às ' + meeting.time_meeting, // Subject line
      text: '', // plaintext body
      html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Email de Reunião Enviado: ' + info.response);
  });
}
MeetingsDAO.prototype.reinviteMeeting = function(app, code_meeting, req, res){
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
        MeetingsDAO.prototype.inviteMeeting(app, result[0]);
        res.redirect('/reunioes');
        mongoClient.close();
      });
    });
  });
}
module.exports = function(){
  return MeetingsDAO;
}
