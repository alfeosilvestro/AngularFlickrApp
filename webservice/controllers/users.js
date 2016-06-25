var express = require('express');
var router = express.Router();

/* Include Controller Base */
var CtrlBase = require('./base/controllerbase.js');

var Settings = CtrlBase.AppSettings();
var Mongo = CtrlBase.Mongo();

/* Model Include */
var User = require('../models/users.js');

var Model = CtrlBase.Model('users');

/* GET listing. */
router.get('/', CtrlBase.IsAuthenticated, function(req, res, next) {

    //console.log(req.user);
    console.log(CtrlBase.getSessionIdFromRequest(req));

    var respData = CtrlBase.ResponseTemplate();

    //console.log('open db connection');
    // CtrlBase.ConnectDb();

    var takeall = req.query.takeall;
    var perpage = parseInt(req.query.pagesize);
    var pageno = parseInt(req.query.page);
    var skiprecords = perpage * (pageno - 1);

    //console.log(perpage + ' / ' + pageno + ' / ' + skiprecords);

    var query = {};
    var options = {};

    if(typeof req.query.searchtext !== 'undefined' && req.query.searchtext !== 'undefined'  && req.query.searchtext !== ''  && req.query.searchtext !== null)
    {
        query = { $or:[ {"username": { "$regex": req.query.searchtext + '', "$options": "i" }}, {"displayname": { "$regex": req.query.searchtext, "$options": "i" }} ]  };

        console.log(query);
    }

    if(typeof takeall !== 'undefined' && takeall !== 'undefined'  && takeall !== ''  && takeall !== null)
    {
         options = {};
    }
    else
    {
        options = {
            //select: 'title date author',
            //sort: { date: -1 },
            //populate: 'author',
            //lean: true,
            //offset: 20,
            page : pageno,
            limit: perpage
        };
    }
    //console.log('query paginate data');
    Model.paginate(query, options).then(function(result) {

        // result.docs
        // result.total
        // result.limit - 10
        // result.offset - 20

        //console.log(result);

        // assign data
        respData.data = result.docs;
        respData.totaldocs = result.total;


        CtrlBase.LogInfo(req, 'get users', 'success', 'info');

        res.send(respData);

    },
    function(result) { // optional
            // failed
            CtrlBase.LogInfo(req, 'get users', 'failed', 'error');
            console.log(result);
    });

});

/* GET listing. */
router.get('/except/:id', CtrlBase.IsAuthenticated, function(req, res, next) {

    console.log(req.query);

    var respData = CtrlBase.ResponseTemplate();

    var perpage = 10000;
    var pageno = 1;
    var skiprecords = 0;

    console.log(perpage + ' / ' + pageno + ' / ' + skiprecords);

    var query = {};
    var options = {};

    options = {
        //select: 'title date author',
        //sort: { date: -1 },
        //populate: 'author',
        //lean: true,
        //offset: 20,
        page : pageno,
        limit: perpage
    };

    console.log('query paginate data');
    Model.paginate(query, options).then(function(result) {

        // assign data
        respData.data = result.docs;
        respData.totaldocs = result.total;

        // CtrlBase.DisconnectDb();
        res.send(respData);

    },
    function(result) { // optional
            // failed
            console.log(result);
    });

});

/* Create */
router.post('/', CtrlBase.IsAuthenticated, function(req, res, next) {

    //console.log(req.body);

    // start db connection
    // CtrlBase.ConnectDb();

    // Create a new instance of the Beer model
    var user = new User();

    // Set the beer properties that came from the POST data
    user.password = req.body.password;
    user.username = req.body.username;
    user.displayname = req.body.displayname;
    user.isactive = req.body.isactive;
    user.roles = req.body.roles;

    var timestamp = new Date();
    user.CreatedDate = timestamp;
    user.ModifiedDate = timestamp;
    user.CreatedBy = "system admin";
    user.ModifiedBy = "system admin";

    // Save the beer and check for errors
    user.save(function(err) {

        // close db connection
        // CtrlBase.DisconnectDb();

        // error
        if (err){
            res.send(err);
        }

        // success
        var respObj = { message: 'user has been created!', data: user };
        console.log('success');
        console.log(respObj);
        res.json(respObj);
    });

});

// Get by ID
router.get('/:id', CtrlBase.IsAuthenticated, function(req, res, next) {

  console.log('get');
  console.log(req.params);
  //res.send(200);

  // CtrlBase.ConnectDb();

  Model.findById(req.params.id, function(err, data) {

    // CtrlBase.DisconnectDb();

    if (err){
      res.send(err);
    }

    res.json(data);

  });

});

// Get by ID
router.post('/signin', function(req, res, next) {

  //console.log('sign in');
  //console.log(req.headers);

  var data = {
      code : 0,
      message: '',
      messageKey: '',
      token: '',
      token_timeout: 0, // date in integer value
      sessionid: ''
  };

  Model.findOne({ username: req.body.username }, function (err, user) {

    if (err) {
      data.code = -9999;
      data.message = "Error occurred.";
      data.messageKey = "page.notifications.errorinauthentication";
      res.json(data);
      return;
    }

    // No user found with that username
    if (!user || user == null) {
      data.code = -1;
      data.message = "Cannot find user with provided user name.";
      data.messageKey = "page.notifications.usernotfound";
      res.json(data);
      return;
    }

    // Make sure the password is correct
    user.verifyPassword(req.body.password, function(err, isMatch) {
      if (err) {
        data.code = -2;
        data.message = "Error occurred while comparing password.";
        data.messageKey = "page.notifications.errorinauthentication";
        res.json(data);
        return;
      }

      // Password did not match
      if (!isMatch) {
          data.code = -3;
          data.message = "Password not matched";
          data.messageKey = "page.notifications.passwordnotmatch";
          res.json(data);
          return;
      }

      // Success
      var d1 = new Date ();
      var d2 = new Date ( d1 );
      d2.setHours ( d1.getHours() + 6 );

      // console.log(d1);
      // console.log(d2);
      // console.log(d2.getTime());

      data.code = 1;
      data.message = 'Sign in successful.';
      data.token = user.getAuthorizationToken(req.body.username, req.body.password);
      data.token_timeout = d2.getTime();
      data.sessionid = CtrlBase.newGuid();

      console.log(data);

      res.json(data);
    });
  });

});

router.get('/code/:code', CtrlBase.IsAuthenticated, function(req, res, next) {

  console.log('get by code');
  console.log(req.params);
  //res.send(200);

  // CtrlBase.ConnectDb();

  Model.findOne({'code': req.params.code}, function(err, data) {

    // CtrlBase.DisconnectDb();

    if (err){
      res.send(err);
    }

    res.json(data);

  });

});

router.put('/:id', CtrlBase.IsAuthenticated, function(req, res, next) {

    console.log('put');
    console.log(req.params.id);
    console.log(req.body);

    // start db connection
    // CtrlBase.ConnectDb();

    // find data
    Model.findById(req.params.id, function(err, user) {

      if (err){
        res.send(err);
      }

      if(typeof user === 'undefined'){
          res.json({'status': 'failed'});
      }

      // update data
      user.password = req.body.password;
      user.username = req.body.username;
      user.displayname = req.body.displayname;
      user.isactive = req.body.isactive;
      user.roles = req.body.roles;

      var timestamp = new Date();
      user.ModifiedDate = timestamp;
      user.ModifiedBy = "system admin";

      // save updated data
      user.save(function(err) {

          // close db connection
          // CtrlBase.DisconnectDb();

          // error
          if (err){
              res.send(err);
          }

          // success
          var respObj = { message: 'user has been updated!', data: user };
          console.log('success');
          console.log(respObj);
          res.json(respObj);
      });

    });

});

// Get by ID
router.delete('/:id', CtrlBase.IsAuthenticated, function(req, res, next) {

  console.log('delete');
  console.log(req.params);
  //res.send(200);

  // CtrlBase.ConnectDb();

  Model.findByIdAndRemove(req.params.id, function(err, data) {

    // CtrlBase.DisconnectDb();

    if (err){
      res.send(err);
    }

    res.json({message: 'Record has been deleted.'});

  });

});


module.exports = router;
