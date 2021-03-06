﻿angular.module('MyApp')
  .factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
    function ($http, $location, $rootScope, $cookieStore, $alert) {
        $rootScope.currentUser = $cookieStore.get('user');
        $cookieStore.remove('user');

        return {
            login: function (user) {
                return $http.post('/api/login', user)
                  .success(function (data) {
                      $rootScope.currentUser = data;
                      $location.path('/');

                      $alert({
                          title: 'Success!',
                          content: 'You are now logged in.',
                          placement: 'top-right',
                          type: 'success',
                          duration: 3
                      });
                  })
                  .error(function () {
                      $alert({
                          title: 'Error!',
                          content: 'Invalid username or password.',
                          placement: 'top-right',
                          type: 'danger',
                          duration: 3
                      });
                  });
            },
            register: function (user) {
                return $http.post('/api/register', user)
                  .success(function () {
                      $location.path('/login');

                      $alert({
                          title: 'Congratulations!',
                          content: 'Your account has been created.',
                          placement: 'top-right',
                          type: 'success',
                          duration: 3
                      });
                  })
                  .error(function (response) {
                      $alert({
                          title: 'Error! The email address may already be registered. Please try a different email address.',
                          content: response.data,
                          placement: 'top-right',
                          type: 'danger',
                          duration: 3
                      });
                  });
            },
            logout: function () {
                return $http.get('/api/logout').success(function () {
                    $rootScope.currentUser = null;
                    $cookieStore.remove('user');
                    $alert({
                        content: 'You have been logged out.',
                        placement: 'top-right',
                        type: 'info',
                        duration: 3
                    });
                });
            }
        };
    }]);