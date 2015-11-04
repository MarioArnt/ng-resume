'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, profile, $rootScope) {
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  $scope.$on('onRepeatLast', function(){
    $('.skills-list').columnize({columns: 3, lastNeverTallest:true});
  });
  $scope.dropdown = [
    {
      'text': 'English',
      'href': 'download/cv/en'
    },
    {
      'text': 'French',
      'click': 'downloadCv(fr)'
    },
    {
      'text': 'Spanish',
      'click': 'downloadCv(es)'
    }
  ];
  $scope.me.projects.forEach(function(project){
    project.skills.forEach(function(skill) {
      skill.tooltip = {
        'title': skill.name,
      };
    });
  });

});
