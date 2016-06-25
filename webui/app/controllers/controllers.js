/*#######################################################################

  Controllers

  #######################################################################*/


(function () {
  'use strict';

  angular
    .module('flickrApp.controllers', ['flickrApp.provider'])
    .controller('PhotosController', PhotosController);


  function PhotosController ($scope, Flickr) {

    $scope.searchPhoto = function(){

      var searchKeyword = $scope.txtKeyword;

      Flickr.setKeyword(searchKeyword);

      Flickr.getPublicFeed()
          .then(function(resp)
          {
              if(typeof resp.data.obj !== 'undefined' && typeof resp.data.obj.photos.photo !== 'undefined')
              {
                $scope.photos = resp.data.obj.photos.photo;
              }
              else {
                alert('Connection Failed or Flickr service not reachable.');
              }

          });

    };

    $scope.$on('$viewContentLoaded', function(){
      //Here your view content is fully loaded !!
       $scope.searchPhoto();
    });

  }

})();
