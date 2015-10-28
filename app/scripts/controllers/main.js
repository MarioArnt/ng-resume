'use strict';

angular.module('marioCvApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.profile = null;
    $http.get('../../data/profile.json')
     .success(function(data) {
       $scope.profile = angular.fromJson(data);
     })
     .error(function(){
       $scope.profile = [{heading:'Error',description:'Could not load json data'}];
     });
   console.log($scope.profile);
  });
