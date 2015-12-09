angular.module('MyApp')
  .factory('Attendee', ['$http', function ($http) {
      return {
          addattendee: function (session, user) {
              return $http.post('/api/addattendee', { sessionID: session._id });
          },
          removeattendee: function (session, user) {
              return $http.post('/api/removeattendee', { sessionID: session._id });
          },
          addcomment: function (session, comment) {
              return $http.post('/api/addcomment', { sessionID: session._id, commentbody: comment });
          }
      };
  }]);