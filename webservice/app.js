var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// configure routes
var routeConf = require('./configurations/route-conf.js');
//var mongoose = require('mongoose');
//var passport = require('passport');
//var authController = require('./controllers/auth');

var conf = require('./configurations/app_config.js');
var settings = conf.Settings();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: 100000  }));
app.use(cookieParser());
app.use(cors());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(passport.initialize());


/*===========================================*/
// database connection starts // not required in flickr app

// var dbHost = settings.database.server;
// var dbPort = settings.database.port;
// var dbName = settings.database.db_name;
// var mongoDbUrl = 'mongodb://'+ dbHost +':'+ dbPort +'/' + dbName;

// database connection ends
/*===========================================*/

/*===========================================*/
// db connection starts // not required in flickr app

//mongoose.connect(mongoDbUrl);

// db connection ends
/*===========================================*/

/*===========================================*/
// route config starts

routeConf.Configure(app);

// route config ends
/*===========================================*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// set environment of application from OS level
/*
linux & mac: export NODE_ENV=production
windows: set NODE_ENV=production
*/

if (app.get('env') === 'production')
{
  app.listen(settings.webserver.port, function () {
    console.log('Flickr image service listening on port '+ settings.webserver.port +'!');
  });
}
else {
  // in development environment
  // we will run with nodemon to monitor changes
  // and restart app automatically
  module.exports = app;
}

// include super test
var test = require('supertest');

// test with super test
test(app)
  .get('/flickrimgs')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) {
      throw err;
    } else {
      console.log('test passed');
      console.log(res.body);
    }

  });


/*

NodeJS can deploy and monitored on ForeverJS environment (currently used in one of our projects) or
To automate the deployment process and monitoring, we can use strong-pm

*/
