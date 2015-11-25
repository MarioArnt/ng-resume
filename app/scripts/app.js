'use strict';

var app = angular.module('ngResume', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'mgcrea.ngStrap'
  //'angular-nicescroll'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/en', {
    templateUrl: '../main.html',
    controller: 'MainCtrl',
    resolve: {
      profile: function(profileService) {
        return profileService.getProfile('data/en-EN.json');
      }
    }
  });
  $routeProvider.when('/fr', {
    templateUrl: '../main.html',
    controller: 'MainCtrl',
    resolve: {
      profile: function(profileService) {
        return profileService.getProfile('data/fr-FR.json');
      }
    }
  });
  $routeProvider.when('/es', {
    templateUrl: '../main.html',
    controller: 'MainCtrl',
    resolve: {
      profile: function(profileService) {
        return profileService.getProfile('data/es-ES.json');
      }
    }
  });
  $routeProvider.otherwise({redirectTo: '/en'});
}]);
