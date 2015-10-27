'use strict';

angular
  .module('marioCvApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/index',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
