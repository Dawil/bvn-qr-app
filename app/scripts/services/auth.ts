/// <reference path="../app.ts" />
'use strict';

interface IAuthService {
	logInUrl:string;
  logOut: () => void;
  isLoggedIn: () => bool;
	accessToken: (string) => any;
}

bvnQrApp.factory('auth',
		<any[]>['$window', '$cookieStore',
		function($window, $cookieStore):IAuthService {
	// create a url to direct the user to
	var env = $window.location.origin.search('localhost') != -1 ?
						'dev' : 'prod',
			clientId = env == 'dev' ?
						"640956945398.apps.googleusercontent.com" :
						"640956945398-buj3vfpr8122a6j2abamh81066av0cgv.apps.googleusercontent.com",
			redirectUri = $window.location.origin
									+ $window.location.pathname
									+ "oauth2callback.html",
			scope = ["https://spreadsheets.google.com/feeds/",
							 "https://www.googleapis.com/auth/drive.file",
							 "https://docs.google.com/feeds"].join(" "),
			params = [ ["response_type"		, "token"]
							 , ["client_id"				, clientId]
							 , ["redirect_uri"		, $window.escape(redirectUri)]
							 , ["scope"						, $window.escape(scope)]
							 , ["approval_prompt"	, "auto"]
							 ],
			paramsString = params.map( (keyValue) => keyValue.join("=") ).join("&"),
			baseUrl = "https://accounts.google.com/o/oauth2/auth",
			googleApiUrl = [baseUrl, paramsString].join("?");
	console.log(env,clientId);
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
