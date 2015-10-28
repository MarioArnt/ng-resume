angular.module('ngResume')
.controller('MainCtrl', function ($scope, $http) {
  'use strict';
  $scope.me = null;
  $http.get('../../data/profile.json')
  .success(function(data) {
    $scope.me=data;
    console.log($scope.me);
    var years = [];
    $scope.me.events.forEach(function(event) {
      years.push(event.year);
    });
    function unique(value, index, self) {
      return self.indexOf(value) === index;
    }
    $scope.years = years.filter(unique).sort(function(a, b) {
    return a - b;
    });
    $scope.currentYear = $scope.years[0];
    console.log(years);
    console.log($scope.years);
  })
  .error(function(){
    $scope.me = [{heading:'Error',description:'Could not load profile data'}];
    console.log($scope.me);
  });
});
