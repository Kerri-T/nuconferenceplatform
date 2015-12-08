angular.module('MyApp')
  .factory('AttendeeList', ['$http', function ($http) {
      return {
          addattendee: function (session, user) {
              return $http.post('/api/addattendee', { sessionID: session._id });
          },
          removeattendee: function (session, user) {
              return $http.post('/api/removeattendee', { sessionID: session._id });
          }
      };
  }]);