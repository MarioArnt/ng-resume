'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, profile, $rootScope) {
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
});
