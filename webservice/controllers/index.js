var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', {
    title: 'Flickr Image Service' ,
    subtitle: 'Flickr PUBLIC IMAGE SERVICE',
    subtitletheme: 'info',
    message: 'Service is up and running',
    messagetheme: "success"
  });
  // res.send('xxx') // send text
  // res.send({abc: ""}) // send json
  // res.send
});

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // res.send('xxx') // send text
  // res.send({abc: ""}) // send json
  // res.send
  // req.query
});

module.exports = router;
