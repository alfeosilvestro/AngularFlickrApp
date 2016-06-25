var mongoose = require('mongoose');

var conf = require('../../configurations/app_config.js');
var settings = conf.Settings();

// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var authController = require('../auth');

var Log = require('../../models/logs.js');

var ControllerBase = function () {};

ControllerBase.prototype.newGuid = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

ControllerBase.prototype.getSessionIdFromRequest = function(req) {
    //console.log(req.headers);
    return req.headers['sessionid'];
};

var logToDatabase = function(req, action, result, level) {

    var log = new Log();

    var request_timestamp = req.headers['request-timestamp']
    var int_timestamp = parseInt(request_timestamp);
    var timestamp = new Date(int_timestamp);

    // Set the beer properties that came from the POST data
    log.user_timestamp = timestamp; // req.headers['timestamp'];
    log.sessionid = req.headers['sessionid'];
    log.action = action;

    if(typeof req.user !== 'undefined'){
      log.username =  req.user.username
    }

    log.host = req.headers['origin'];
    log.result = result;
    log.system_timestamp = new Date();
    log.level = level;
    log.resource = req.originalUrl;
    log.requestmethod = req.method;

    // Save the beer and check for errors
    log.save(function(err) {});

};

ControllerBase.prototype.LogInfo = function (req, action, result, level) {
    logToDatabase(req, action, result, level);
};

ControllerBase.prototype.IsAuthenticated = function (req, res, next) {

    // this part is to use with authentication
    // var UserModel = require('../../models/users');
    //
    // logToDatabase(req, 'authenticate user', 'started', 'info');
    //
    // authController.isAuthenticated(req, res, next);
    //
    // logToDatabase(req, 'authenticate user', 'success', 'info');

};

ControllerBase.prototype.AppSettings = function () {
    return settings;
};

ControllerBase.prototype.Mongo = function () {
    return mongoose;
};

ControllerBase.prototype.Model = function (modelName) {
    return mongoose.model(modelName);
};

ControllerBase.prototype.ResponseTemplate = function () {
    return {
            data: {},
            totaldocs: 0
        };
};

module.exports = new ControllerBase();
