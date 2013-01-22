'use strict';
bvnQrApp.controller('LogInCtrl', [
    '$scope', 
    'auth', 
    function ($scope, auth) {
        $scope.logIn = auth.logIn;
    }]);
