angular.module('marioCvApp')
.controller('MainCtrl', function ($scope, $http) {
  'use strict';
  $scope.me = null;
  $http.get('../../data/profile.json')
  .success(function(data) {
    $scope.me=data;
    console.log($scope.me);
  })
  .error(function(){
    $scope.me = [{heading:'Error',description:'Could not load profile data'}];
    console.log($scope.me);
  });
});
