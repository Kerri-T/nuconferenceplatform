var App = angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap']);
  
App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).
    when('/', {
        templateUrl: 'views/home.html',
    }).
    when('/home', {
        templateUrl: 'views/home.html',
    }).
    when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'registerCtrl'
    }).
    when('/sessions', {
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl'
    }).
    when('/createsession', {
        templateUrl: 'views/createsession.html',
        controller: 'addSessionCtrl'
    }).
    when('/sessions/:id', {
        templateUrl: 'views/session.html',
        controller: 'sessionDetailCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}])
