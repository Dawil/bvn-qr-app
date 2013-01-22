'use strict';
bvnQrApp.controller('Oauth2CallbackCtrl', [
    '$scope', 
    '$routeParams', 
    'auth', 
    '$location', 
    function ($scope, $routeParams, auth, $location) {
        $scope.status = function () {
            if($routeParams.error) {
                return 'error';
            } else {
                if($routeParams.access_token) {
                    return 'receivingCallback';
                } else {
                    return 'invalidLocation';
                }
            }
        };
        if($scope.status() == 'receivingCallback') {
            auth.accessToken($routeParams.access_token);
            $location.path('/sessions');
        } else {
            $location.path('/welcome');
        }
    }]);
//@ sourceMappingURL=oauth_2_callback.js.map
