/// <reference path="../app.ts" />
'use strict';

interface IAuthService {
	logInUrl:string;
  logOut: () => void;
  isLoggedIn: () => bool;
	accessToken: (string) => any;
}

bvnQrApp.factory('auth',
		<any[]>['$window', '$cookieStore', '$location',
		function($window, $cookieStore, $location):IAuthService {
	// create a url to direct the user to
	var env = $location.origin.search('localhost') == 1 ?
						'development' : 'production',
			clientId = env == 'devlopment' ?
						"640956945398.apps.googleusercontent.com" :
						"640956945398-buj3vfpr8122a6j2abamh81066av0cgv.apps.googleusercontent.com",
			scope = ["https://spreadsheets.google.com/feeds/",
							 "https://www.googleapis.com/auth/drive.file"].join(" "),
			params = [ ["response_type"		, "token"]
							 , ["client_id"				, clientId]
							 , ["redirect_uri"		, $window.escape($location.origin + "/oauth2callback.html")]
							 , ["scope"						, $window.escape(scope)]
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
		},
		accessToken: function(token) {
			if (token) {
				return $cookieStore.put('accessToken', token);
			} else {
				return $cookieStore.get('accessToken');
			}
		}
};
}]);
