angular.module('ngResume', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/index',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
