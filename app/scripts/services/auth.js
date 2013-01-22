'use strict';
bvnQrApp.factory('auth', [
    '$window', 
    '$cookieStore', 
    '$location', 
    function ($window, $cookieStore, $location) {
        var env = $location.origin.search('localhost') == 1 ? 'development' : 'production', clientId = env == 'devlopment' ? "640956945398.apps.googleusercontent.com" : "640956945398-buj3vfpr8122a6j2abamh81066av0cgv.apps.googleusercontent.com", scope = [
"https://spreadsheets.google.com/feeds/", 
"https://www.googleapis.com/auth/drive.file"        ].join(" "), params = [
[
"response_type", 
"token"            ], 
[
"client_id", 
clientId            ], 
[
"redirect_uri", 
$window.escape($location.origin + "/oauth2callback.html")            ], 
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
