angular.module('MyApp')
  .controller('addSessionCtrl', ['$scope', 'CreateSession', function ($scope, CreateSession) {
      $scope.addSession = function () {
          CreateSession.create({
              sessionname: $scope.sessionname,
              sessiondescription: $scope.sessiondescription,
              sessiondate: $scope.sessiondate,
              sessionstart: $scope.sessionstart,
              sessionend: $scope.sessionend
          });
      };
  }]);



