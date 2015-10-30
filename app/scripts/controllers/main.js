'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, profile, $rootScope) {
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  $scope.$on('onRepeatLast', function(){
    $('.skills-list').columnize({columns: 3, lastNeverTallest:true});
  });
});
