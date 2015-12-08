angular.module('MyApp')
  .factory('Session', ['$resource', function ($resource) {
      return $resource('/api/sessions/:_id');
  }]);