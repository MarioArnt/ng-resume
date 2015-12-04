'use strict';

angular.module('ngResume')
.factory('profileService', ['$http', function($http) {
  var api = {
    getProfile: function(profilePath) {

      var promise = $http({ method: 'GET', url: '../../' + profilePath })
      .success(function(data) {
        return data;
      })
      .error(function() {
        return {status:'Error', message:'Could not load profile data'};
      });
      return promise;
    }
  };
  return api;
}]);
