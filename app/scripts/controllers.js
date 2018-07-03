'use strict';

angular.module('ngResume')
.controller('MainCtrl', function($scope, $anchorScroll, Notification, $location, $http, vcRecaptchaService, profile, $window, $rootScope) {
  $rootScope.loadingFinished = true;
  $scope.me = profile.data;
  $scope.me.events.sort((a, b) => (100*b.year) + b.month - (100*a.year) - a.month);
  $rootScope.title = $scope.me.fullName + ' | Interactive résumé';
  angular.element($window).bind('resize', () => {
      $('.profile-picture').css('top', $('header').height()-0.5*$('.profile-picture').height());
  });
  $('.profile-picture').css('top', $('header').height()-0.5*$('.profile-picture').height());

  $scope.me.events.forEach((event) => {
    event.showMore = false;
  });

  $scope.me.skills.forEach((cat) => cat.skills.forEach((skill) => skill.showMore = false));

  $scope.me.projects.forEach((project) => {
    project.skills.forEach((skill) => {
      skill.tooltip = {
        'title': skill.name,
      };
    });
  });

  $scope.changeLang = (lang) => {
    if(lang === $scope.me.lang) {return;}
    $location.path('/'+lang);
    $location.hash('');
  };

  $scope.scrollTo = (id) => {
     $location.hash(id);
     $anchorScroll();
  };

  $scope.toggleDetails = (i, j) => {
    let skill = $scope.me.skills[i].skills[j];
    skill.showMore = !skill.showMore;
  };

  $scope.emptyOptionalFields = false;
  $scope.sendMail = (isValid) => {
    if (isValid) {
      if(!$scope.mail.object || !$scope.mail.body){
        $scope.emptyOptionalFields = !$scope.emptyOptionalFields;
        return;
      }
      if(vcRecaptchaService.getResponse() === '') {
        Notification.error({
          message: 'Please fill the captcha',
          title: 'Missing fields',
          positionX: 'center'
        });
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
      }).then(() => {
        Notification.success({
          message: 'Your email have been successfully sent',
          title: 'Success',
          positionX: 'center'
        });
      }, () => {
        Notification.error({
          message: 'Your email could not be delivered',
          title: 'Error while sending email',
          positionX: 'center'
        });
      });
    }
  };
});
