'use strict';
bvnQrApp.controller('SessionsCtrl', [
    '$scope', 
    'auth', 
    'spreadsheets', 
    function ($scope, auth, spreadsheets) {
        spreadsheets.getSpreadsheets(auth.accessToken());
    }]);
//@ sourceMappingURL=sessions.js.map
