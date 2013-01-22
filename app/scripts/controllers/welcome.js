'use strict';
bvnQrApp.controller('WelcomeCtrl', [
    '$scope', 
    'auth', 
    function ($scope, auth) {
        $scope.logInUrl = auth.logInUrl;
    }]);
