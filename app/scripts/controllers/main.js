'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, $location, $http, profile, $window, $rootScope) {
  $scope.loadingFinished = true;
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  $scope.$on('onRepeatLast', function(){
    columnizeSkills();
  });

  angular.element($window).bind('resize', function () {
    if($('.dontsplit').parent().is('.column')) {
      $('.dontsplit').unwrap();
      columnizeSkills();
    }
  });

  function columnizeSkills() {
    console.log($window.innerWidth);
    if($window.innerWidth < 768) {
      $('.skills-list').columnize({columns: 1, lastNeverTallest:true});
      return;
    }
    else if($window.innerWidth > 768 && $window.innerWidth < 992) {
      $('.skills-list').columnize({columns: 2, lastNeverTallest:true});
      return;
    }
    else if($window.innerWidth > 992){
      $('.skills-list').columnize({columns: 3, lastNeverTallest:true});
      return;
    }
    $('.skills-list').columnize({columns: 1, lastNeverTallest:true});
  }

  $scope.me.events.forEach(function(event){
    event.showMore = false;
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
  $scope.emptyOptionalFields = false;
  $scope.sendMail = function(isValid) {
    if (isValid) {
      if(!$scope.mail.object || !$scope.mail.body){
        $scope.emptyOptionalFields = !$scope.emptyOptionalFields;
        return;
      }
      $http({
         method: 'POST',
         url: '/mail',
         data: $.param({
             from: $scope.mail.from,
             object: $scope.mail.object,
             content: $scope.mail.body
         }),
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function() {
        console.log('success');
      }, function(){
        console.log('failure');
      });
    }
  };
});
