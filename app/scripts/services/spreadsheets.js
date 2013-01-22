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
                $http.get(API_URL + "/files?access_token=" + accessToken, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(success, fail);
            }
        };
    }]);
//@ sourceMappingURL=spreadsheets.js.map
