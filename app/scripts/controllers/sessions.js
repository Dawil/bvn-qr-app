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
        $scope.qrInfo = {
            message: '',
            cssClass: 'plain'
        };
        $scope.addRow = function () {
            spreadsheets.addRow($scope.newAttendee, auth.accessToken());
        };
        $scope.scanQr = function (image) {
            var file = image.files[0];
            $scope.qrInfo = {
                message: 'Decoding QR code...',
                cssClass: 'decoding'
            };
            var x = qrReader.scanQr(file);
            x.then(function (attendeeEmail) {
                if(attendeeEmail.search("error") !== -1) {
                    $scope.qrInfo = {
                        message: 'Error decoding QR code. Try taking a new picture.',
                        cssClass: 'decoding-error'
                    };
                } else {
                    $scope.qrInfo = {
                        message: 'QR code decoded! Uploading ' + attendeeEmail + ' as attending...',
                        cssClass: 'decoding-success'
                    };
                    spreadsheets.addRow(attendeeEmail, auth.accessToken()).then(function (result) {
                        $scope.qrInfo = {
                            message: 'Successfully marked ' + attendeeEmail + ' as attending!',
                            cssClass: 'upload-success'
                        };
                    });
                }
            });
        };
    }]);
//@ sourceMappingURL=sessions.js.map
