// buz.js
var Configuration = function () {};

Configuration.prototype.Settings = function () {
    return {
        webserver : {
            port: "3000",
            jsonpayload: "50mb"
        },
        database:{
            server: "127.0.0.1",
            port: "27017",
            db_name: "flickr_image_users"
        },
        thirdparty_api:{
          flickr_api_key: "xxxxx",
          flickr_api_secret: "yyyy"
        }
    };
};

module.exports = new Configuration();
