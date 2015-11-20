'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, $location, profile, $rootScope) {
  $scope.loadingFinished = true;
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  $scope.$on('onRepeatLast', function(){
    $('.skills-list').columnize({columns: 3, lastNeverTallest:true});
  });
  $scope.me.projects.forEach(function(project){
    project.skills.forEach(function(skill) {
      skill.tooltip = {
        'title': skill.name,
      };
    });
  });
  $scope.changeLang = function(lang) {
    if(lang === $scope.me.lang) {return;}
    $location.path('/'+lang);
  };
  $scope.sendMail = function() {
    if(!$scope.mail.from){
      console.log('please enter a valid email address');
        return;
    }
    if(!$scope.mail.object){
      console.log('no object, send anyway ?');
      return;
    }
    if(!$scope.mail.body){
      console.log('empty mail, send anyway ?');
      return;
    }
    console.log('everything seems allright, sending POST request');
    //send post request
  };
});
