angular.module('MyApp')
  .controller('addSessionCtrl', ['$scope', '$rootScope', 'CreateSession', function ($scope, $rootScope, CreateSession) {
      $scope.timePattern = (function () {
          var regexp = /^(0?[1-9]|1[012])(:[0-5]\d) [AP][M]$/;
          return {
              test: function (value) {
                  if ($scope.timeRequired === false) {
                      return true;
                  }
                  return regexp.test(value);
              }
          };
      })();
      $scope.addSession = function () {
          CreateSession.create({
              sessionname: $scope.sessionname,
              sessiondescription: $scope.sessiondescription,
              sessiondate: $scope.sessiondate,
              sessionstart: $scope.sessionstart,
              sessionend: $scope.sessionend,
              speakerfname: $rootScope.currentUser.firstName,
              speakerlname: $rootScope.currentUser.lastName,
              speakeremail: $rootScope.currentUser.email
          });

      };
  }]);



