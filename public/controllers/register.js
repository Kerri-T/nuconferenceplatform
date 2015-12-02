angular.module('MyApp')
  .controller('registerCtrl', ['$scope', 'Auth', function ($scope, Auth) {
      $scope.register = function () {
          Auth.register({
              fname: $scope.fname,
              lname: $scope.lname,
              email: $scope.email,
              attendeetype: $scope.attendeetype,
              organization: $scope.organization,
              password: $scope.password
          });
      };
  }]);