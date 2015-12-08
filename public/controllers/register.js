angular.module('MyApp')
  .controller('registerCtrl', ['$scope', 'Auth', function ($scope, Auth) {
      $scope.register = function () {
          Auth.register({
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              email: $scope.email,
              attendeetype: $scope.attendeetype,
              organization: $scope.organization,
              password: $scope.password
          });
      };
  }]);