'use strict';
bvnQrApp.factory('spreadsheets', [
    '$http', 
    function ($http) {
        var API_URL = "https://www.googleapis.com/drive/v2";
        return {
            getSpreadsheets: function (accessToken) {
                var success = function (result) {
console.log(result);                }, fail = function (error) {
console.log(error);                };
                $http.jsonp(API_URL + "/files?access_token=" + accessToken).then(success, fail);
            }
        };
    }]);
