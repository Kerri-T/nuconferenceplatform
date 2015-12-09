angular.module('MyApp')
  .controller('sessionDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Session', 'Attendee',
    function ($scope, $rootScope, $routeParams, Session, Attendee) {
        Session.get({ _id: $routeParams.id }, function (session) {
            $scope.session = session;
            $scope.isAttending = function () {
                return $scope.session.attendees.indexOf($rootScope.currentUser.email) !== -1;
            };

            $scope.addattendee = function () {
                Attendee.addattendee(session).success(function () {
                    $scope.session.attendees.push($rootScope.currentUser.email);
                });
            };
            $scope.addcomment = function () {
                Attendee.addcomment(session, $scope.commentbody).success(function () {
                    $scope.session.comments.push({ commentbody: $scope.commentbody, sender: $rootScope.currentUser.email });
                });
            };
            $scope.removeattendee = function () {
                Attendee.removeattendee(session).success(function () {
                    var index = $scope.session.attendees.indexOf($rootScope.currentUser.email);
                    $scope.session.attendees.splice(index, 1);
                });
            };

            
        });
    }]);