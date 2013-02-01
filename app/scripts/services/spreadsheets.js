'use strict';
function f() {
}
bvnQrApp.factory('spreadsheets', [
    '$http', 
    '$q', 
    'bvnProxy', 
    'googleApiUrl', 
    function ($http, $q, bvnProxy, googleApiUrl) {
        var f, f;
        var _attendanceSheet = {
metaData: null,
rows: null        }, _formSheet;
        var loadSpreadsheetData = function (accessToken) {
            var f, f;
            var deferred = $q.defer();
            var success = function (result) {
                var f, f;
                var sheets = result.data.items;
                var formSheet, attendanceSheetMetaData;
                for(var i = 0; i < sheets.length; i++) {
                    if(sheets[i].title.search("QR App Test") == 0) {
                        if(sheets[i].title.search("Form") != -1) {
                            formSheet = sheets[i];
                        } else {
                            if(sheets[i].title.search("Attendance") != -1) {
                                attendanceSheetMetaData = sheets[i];
                            }
                        }
                    }
                }
                deferred.resolve({
                    attendanceSheetMetaData: attendanceSheetMetaData,
                    formSheet: formSheet
                });
            };
            var fail = function (error) {
                console.log(error);
            };
            var url = googleApiUrl.drive().files().authenticate(accessToken).toFullUrl() + "&callback=JSON_CALLBACK";
            $http.jsonp(url).then(success, fail);
            return deferred.promise;
        };
        var loadRows = function (sheet, accessToken) {
            var urlAndParams = googleApiUrl.spreadsheets().sheet(sheet.id).authenticate(accessToken).asJson().toUrlAndParams();
            var deferred = $q.defer();
            $http.jsonp(urlAndParams.url + "?callback=JSON_CALLBACK", {
                params: urlAndParams.params
            }).then(function (result) {
                deferred.resolve(result);
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            });
            return deferred.promise;
        };
        return {
            syncData: function (accessToken) {
                var deferred = $q.defer();
                loadSpreadsheetData(accessToken).then(function (result) {
                    _attendanceSheet.metaData = result.attendanceSheetMetaData;
                    _formSheet = result.formSheet;
                    loadRows(_attendanceSheet.metaData, accessToken).then(function (result) {
                        _attendanceSheet.rows = result;
                        deferred.resolve();
                    }, function (error) {
                        console.log(error);
                    });
                }, function (error) {
                    console.log(error);
                });
                return deferred.promise;
            },
            getRows: function () {
                return _attendanceSheet.rows;
            },
            getSpreadsheet: function () {
                return _attendanceSheet.metaData;
            },
            getFormSheet: function () {
                return _formSheet;
            },
            addRow: function (row, accessToken) {
                var f, f;
                var deferred = $q.defer();
                $http({
                    url: "https://script.google.com/a/macros/davidgwilcox.com/s/AKfycbzTJIyUdlhe6cb13ULpz5gRrlq5icQ_fpNIH-J-bLaPl46_F2A/exec",
                    method: 'JSONP',
                    params: {
                        person: row,
                        callback: 'JSON_CALLBACK',
                        alt: 'json'
                    }
                }).then(function (res) {
                    deferred.resolve(res);
                }, function (error) {
                    deferred.resolve(error);
                });
                return deferred.promise;
            }
        };
    }]);
//@ sourceMappingURL=spreadsheets.js.map
