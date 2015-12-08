angular.module('MyApp')
  .controller('SessionsCtrl', ['$scope', 'Session', function ($scope, Session) {

      $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'];

      $scope.headingTitle = 'Top 12 Sessions';

      $scope.sessions = Session.query();

      $scope.filterByAlphabet = function (char) {
          $scope.sessions = Session.query({ alphabet: char });
          $scope.headingTitle = char;
      };
  }]);