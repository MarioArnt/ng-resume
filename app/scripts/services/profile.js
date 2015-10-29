'use strict';

angular.module('ngResume')
.factory('profileService', ['$http', function($http) {
  var api = {
    getProfile: function() {
      var promise = $http({ method: 'GET', url: '../../data/profile.json' })
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
