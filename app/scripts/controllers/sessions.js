'use strict';
bvnQrApp.controller('SessionsCtrl', [
    '$scope', 
    'auth', 
    'spreadsheets', 
    'qrReader', 
    function ($scope, auth, spreadsheets, qrReader) {
        spreadsheets.syncData(auth.accessToken());
        $scope.getRows = spreadsheets.getRows;
        $scope.getSpreadsheet = spreadsheets.getSpreadsheet;
        $scope.getFormSheet = spreadsheets.getFormSheet;
        $scope.addRow = function () {
            spreadsheets.addRow($scope.newAttendee, auth.accessToken());
        };
        $scope.scanQr = function (image) {
            var file = image.files[0];
            console.log("start");
            var x = qrReader.scanQr(file);
            console.log("end");
            console.log(x);
            x.then(function (attendeeEmail) {
                console.log("sending email");
                console.log(attendeeEmail);
                spreadsheets.addRow(attendeeEmail, auth.accessToken());
            });
        };
    }]);
//@ sourceMappingURL=sessions.js.map
