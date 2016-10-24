var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var freets = require('./routes/freets');

//Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fritter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

//start app
var fritterApp = express();


//app view
fritterApp.use(logger('dev'));
fritterApp.set('views', path.join(__dirname, 'views'));
fritterApp.engine('handlebars',exphbs({defaultLayout:'layout'}));
fritterApp.set('view engine','handlebars');


//BodyParser middleware
fritterApp.use(bodyParser.urlencoded({ extended: false }));
fritterApp.use(bodyParser.json());
fritterApp.use(cookieParser());

//Set Static Folder
fritterApp.use(express.static(path.join(__dirname, 'public')));

//Express Session
fritterApp.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));


fritterApp.use(passport.initialize());
fritterApp.use(passport.session());

//Express Validator
fritterApp.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
fritterApp.use(flash());

fritterApp.use(function(req,res,next){
	res.locals.success_msg=req.flash('success_msg');
	res.locals.error_msg=req.flash('error_msg');
	res.locals.error=req.flash('error'); //passport set own error
	res.locals.user=req.user||null;
	next();
});

//Map paths to imported route handlers
fritterApp.use('/', routes);
fritterApp.use('/users', users);
fritterApp.use('/freets', freets);

//error handlers

//catch 404 and forward to error handler
fritterApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (fritterApp.get('env') === 'development') {
	fritterApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      'message': err.message,
      'error': err
    });
  });
}

// production error handler
// no stacktraces leaked to user
fritterApp.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'error': err.message
  });
});

module.exports = fritterApp;