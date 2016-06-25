var RouteConfiguration = function () {};

// include controller files
var home = require('../controllers/index');
var flikr = require('../controllers/flickrimgs');


// public function
RouteConfiguration.prototype.Configure = function (app) {

    app.use('/', home);
    app.use('/flickrimgs', flikr);


};

module.exports = new RouteConfiguration();
