'use strict';
bvnQrApp.factory('auth', [
    '$window', 
    '$cookieStore', 
    function ($window, $cookieStore) {
        var env = $window.location.origin.search('localhost') != -1 ? 'dev' : 'prod', clientId = env == 'dev' ? "640956945398.apps.googleusercontent.com" : "640956945398-buj3vfpr8122a6j2abamh81066av0cgv.apps.googleusercontent.com", redirectUri = $window.location.origin + $window.location.pathname + "oauth2callback.html", scope = [
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
$window.escape(redirectUri)            ], 
[
"scope", 
$window.escape(scope)            ], 
[
"approval_prompt", 
"auto"            ]        ], paramsString = params.map(function (keyValue) {
return keyValue.join("=");        }).join("&"), baseUrl = "https://accounts.google.com/o/oauth2/auth", googleApiUrl = [
baseUrl, 
paramsString        ].join("?");
        console.log(env, clientId);
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
