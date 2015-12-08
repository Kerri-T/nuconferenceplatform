angular.module('MyApp')
  .controller('sessionDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Session', 'AttendeeList',
    function ($scope, $rootScope, $routeParams, Session, AttendeeList) {
        Session.get({ _id: $routeParams.id }, function (session) {
            $scope.session = session;

            $scope.isAttending = function () {
                return $scope.session.attendees.indexOf($rootScope.currentUser.email) !== -1;
            };

            $scope.addattendee = function () {
                AttendeeList.addattendee(session).success(function () {
                    $scope.session.attendees.push($rootScope.currentUser.email);
                });
            };

            $scope.removeattendee = function () {
                AttendeeList.removeattendee(session).success(function () {
                    var index = $scope.session.attendees.indexOf($rootScope.currentUser.email);
                    $scope.session.attendees.splice(index, 1);
                });
            };

            
        });
    }]);