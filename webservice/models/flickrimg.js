var conf = require('../configurations/app_config.js');
var settings = conf.Settings();

var Flickr = require("flickrapi");
var FlickrOptions = {
      api_key: settings.thirdparty_api.flickr_api_key,
      secret: settings.thirdparty_api.flickr_api_secret,
      progress: false
    };

var FlickrImages = function () {};

FlickrImages.prototype.GetImages = function (searchKeyword, pageNo, imagePerPage, funcCallback) {

  var pageNum = 1;
  var itemsPerPage = 10;

  if(typeof pageNo !== "undefined"){

    pageNum = pageNo;

  }

  if(typeof imagePerPage !== "undefined"){

    itemsPerPage = imagePerPage;

  }

  if(settings.thirdparty_api.flickr_api_key === 'xxxxx')
  {
    console.log('sending mocked data')

    var mockedData = {
        "photos": {
              "page": 1,
              "pages": 1,
              "perpage": 100,
              "total": "3",
              "photo": [
                   {
                      "id": "2332823355",
                      "owner": "53555705@N00",
                      "secret": "e603be40a2",
                      "server": "2333",
                      "farm": 3,
                      "title": "Xbox 360 live",
                      "ispublic": 1,
                      "isfriend": 0,
                      "isfamily": 0,
                      "date_faved": "1248134938",
                      "media" : {
                      	"m" : "http://mygaming.co.za/news/wp-content/uploads/2011/11/Xbox-LIVE-party.jpg"
                      }
                   }
                ]
              // Rest of the photos
          },
        "stat": "ok"
    };

    funcCallback(null, mockedData);

    return;
  }

  Flickr.authenticate(FlickrOptions, function(error, flickr) {

    flickr.photos.search({
      text: searchKeyword,
      page: pageNum,
      per_page: itemsPerPage
    }, function(err, result) {

      funcCallback(err, result);

    });

  });

};

module.exports = new FlickrImages();
