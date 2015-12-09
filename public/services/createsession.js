angular.module('MyApp')
  .factory('CreateSession', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
    function ($http, $location, $rootScope, $cookieStore, $alert) {
        $rootScope.currentUser = $cookieStore.get('user');
        $cookieStore.remove('user');

        return {
            create: function (session) {
                return $http.post('/api/createsession', session)
                  .success(function () {
                      $location.path('/sessions');

                      $alert({
                          title: 'Congratulations!',
                          content: 'Your session has been created.',
                          placement: 'top-right',
                          type: 'success',
                          duration: 3
                      });
                  })
                  .error(function (response) {
                      $alert({
                          title: 'Error! The session name may already exist. Please try a different session name.',
                          content: response.data,
                          placement: 'top-right',
                          type: 'danger',
                          duration: 3
                      });
                  });
            }
        }
    }]);