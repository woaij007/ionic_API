// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myapp.controller('ApiCtrl',function($scope, $http, $q) {

  $scope.init = function(){
    $scope.getImages()
    .then(function(res){
      // success
      console.log('Images: ',res)
      $scope.imageList = res.data;
    }, function(status){
      // err
      console.log('Error: ', status)
    })
  }

  $scope.getImages = function(){
    var defer = $q.defer();
    var url = "https://api.instagram.com/v1/users/11830955/media/recent?access_token=1438541261.1fb234f.a3c0b2474c3447b2b3ecdbcd97244ac6&callback=JSON_CALLBACK";
    $http.jsonp(url)
    .success(function(res){
      defer.resolve(res)
    })
    .error(function(status, err){
      defer.reject(status)
    })

    return defer.promise;
  }

  $scope.init();
});