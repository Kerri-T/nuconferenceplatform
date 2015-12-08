angular.module('MyApp')
  .controller('addSessionCtrl', ['$scope', '$rootScope', 'CreateSession', function ($scope, $rootScope, CreateSession) {
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



