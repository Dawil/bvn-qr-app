'use strict';
bvnQrApp.factory('auth', [
    '$window', 
    '$cookieStore', 
    function ($window, $cookieStore) {
        var scope = [
"https://spreadsheets.google.com/feeds/", 
"https://www.googleapis.com/auth/drive.file"        ].join(" "), params = [
[
"response_type", 
"token"            ], 
[
"client_id", 
"640956945398.apps.googleusercontent.com"            ], 
[
"redirect_uri", 
$window.escape("http://localhost:3501/oauth2callback.html")            ], 
[
"scope", 
$window.escape(scope)            ], 
[
"approval_prompt", 
"auto"            ]        ], paramsString = params.map(function (keyValue) {
return keyValue.join("=");        }).join("&"), baseUrl = "https://accounts.google.com/o/oauth2/auth", googleApiUrl = [
baseUrl, 
paramsString        ].join("?");
        return {
            logInUrl: googleApiUrl,
            logOut: function () {
            },
            isLoggedIn: function () {
            },
            accessToken: function (token) {
                if(token) {
                    return $cookieStore.put('accessToken', token);
                } else {
                    return $cookieStore.get('accessToken');
                }
            }
        };
    }]);
//@ sourceMappingURL=auth.js.map
