/// <reference path="../app.ts" />
'use strict';

interface IAuthService {
	logInUrl:string;
  logOut: () => void;
  isLoggedIn: () => bool;
}

bvnQrApp.factory('auth', function():IAuthService {
	return {
		logInUrl: "https://google.com", //TODO FIXME
		logOut: () => {
		},
		isLoggedIn: () => {
		}
	};
});
