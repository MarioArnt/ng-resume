'use strict';

angular.module('ngResume')
.controller('MainCtrl', function ($scope, $anchorScroll, Notification, $location, $http, vcRecaptchaService, profile, $window, $rootScope) {
  $rootScope.loadingFinished = true;
  $scope.me = profile.data;
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  angular.element($window).bind('resize', function () {
      $('.profile-picture').css('top', $('header').height()-0.5*$('.profile-picture').height());
  });
  $('.profile-picture').css('top', $('header').height()-0.5*$('.profile-picture').height());

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
    $location.hash('');
  };

  $scope.scrollTo = function(id) {
     $location.hash(id);
     $anchorScroll();
  };

  $scope.emptyOptionalFields = false;
  $scope.sendMail = function(isValid) {
    if (isValid) {
      if(!$scope.mail.object || !$scope.mail.body){
        $scope.emptyOptionalFields = !$scope.emptyOptionalFields;
        return;
      }
      if(vcRecaptchaService.getResponse() === '') {
        console.log('please repatcha');
        return;
      }
      $http({
         method: 'POST',
         url: '/mail',
         data: $.param({
             'from': $scope.mail.from,
             'object': $scope.mail.object,
             'content': $scope.mail.body,
             'g-recaptcha-response':vcRecaptchaService.getResponse()
         }),
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function() {
        Notification.success({
          message: 'Your email have been successfully sent',
          title: 'Success',
          positionX: 'center'
        });
      }, function(){
        Notification.error({
          message: 'Your email could not be delivered',
          title: 'Error while sending email',
          positionX: 'center'
        });
      });
    }
  };
});
