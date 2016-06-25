/*#######################################################################

  Provider

  #######################################################################*/


(function () {
  'use strict';

  angular
    .module('flickrApp.provider', [])
    .provider('Flickr', Flickr);

  function Flickr() {
    var base = 'http://localhost:3000/flickrimgs',
        keyword = '',
        pageno = '1',
        perpage = '10';

    this.setPageNo = function(pageNo) {
      pageno = pageNo;
    }

    this.setPerPage = function(perPage) {
      api_key = perPage;
    }

    // Service interface
    this.$get = function($http) {
      var service = {
        getPublicFeed: function() {

          var serviceEndpoint = base + '?keyword='+ keyword +'&pagesize='+ perpage +'&page=' + pageno

          return $http({
            method: 'get',
            url: serviceEndpoint
          });
        },
        // Set Search keyword
        // set search keyword
        setKeyword: function(key) {

          if(typeof key !== "undefined")
          {
            keyword = key.replace(new RegExp(" ", 'g'), "+");
          }
        }
      };


      return service;
    }
}

})();
