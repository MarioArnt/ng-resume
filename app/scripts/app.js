'use strict';

var app = angular.module('ngResume', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'mgcrea.ngStrap'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../main.html',
    controller: 'MainCtrl',
    resolve: {
      profile: function(profileService) {
        return profileService.getProfile();
      }
    }
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);


app.run(['$rootScope', function($root) {
  $root.$on('$routeChangeStart', function(curr) {
    if (curr.$$route && curr.$$route.resolve) {
      $root.loadingView = true;
    }
  });
  $root.$on('$routeChangeSuccess', function() {
    $root.loadingView = false;
  });
}]);
