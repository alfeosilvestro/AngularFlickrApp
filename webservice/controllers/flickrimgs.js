var express = require('express');
var router = express.Router();

/* Include Controller Base */
var CtrlBase = require('./base/controllerbase.js');

var Settings = CtrlBase.AppSettings();

var FlickrImage = require('../models/flickrimg.js');

/* GET listing. */
router.get('/', function(req, res, next) {

  console.log(req.body);

  // Create a new instance of the Beer model
  var flickrModel = FlickrImage;

  // Set the beer properties that came from the POST data
  var keyword = parseInt(req.query.keyword);
  var perpage = parseInt(req.query.pagesize);
  var pageno = parseInt(req.query.page);

  flickrModel.GetImages(keyword, pageno, perpage, function(err, result){

    console.log(result);

    if(err) {

      CtrlBase.LogInfo(req, 'get flickr images', err, 'error');

    }

    var response = {
      error : err,
      obj : result
    };

    res.send(response);

  });

});

module.exports = router;
