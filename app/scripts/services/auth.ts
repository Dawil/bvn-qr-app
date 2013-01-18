/// <reference path="../app.ts" />
'use strict';

interface IAuthService {
	logInUrl:string;
  logOut: () => void;
  isLoggedIn: () => bool;
}

bvnQrApp.factory('auth', <any[]>['$window',
		function($window):IAuthService {
	// create a url to direct the user to
	var params = [ ["response_type"		, "token"]
							 , ["client_id"				, "640956945398.apps.googleusercontent.com"]
							 , ["redirect_uri"		, $window.escape("http://localhost:3501/oauth2callback")]
							 , ["scope"						, $window.escape("https://spreadsheets.google.com/feeds/")]
							 , ["approval_prompt"	, "auto"]
							 ],
			paramsString = params.map( (keyValue) => keyValue.join("=") ).join("&"),
			baseUrl = "https://accounts.google.com/o/oauth2/auth",
			googleApiUrl = [baseUrl, paramsString].join("?");
	return {
		logInUrl: googleApiUrl,
		logOut: () => {
		},
		isLoggedIn: () => {
		}
	};
}]);
