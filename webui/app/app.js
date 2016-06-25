
/*#######################################################################

  Init App

  #######################################################################*/


(function () {
  'use strict';


  angular
    .module('flickrApp', ['ngRoute', ,'ngResource', 'flickrApp.controllers', 'flickrApp.provider'])
    .config(config);


  function config ($locationProvider, $routeProvider, FlickrProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        controller: 'PhotosController',
        templateUrl: '/app/partials/photos.html'
      })
      .otherwise ({ redirectTo: '/'});
  }

})();
