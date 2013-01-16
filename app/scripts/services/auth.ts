/// <reference path="../app.ts" />
'use strict';

interface IAuthService {
  logIn: () => void;
  logOut: () => void;
  isLoggedIn: () => bool;
}

bvnQrApp.factory('auth', function():IAuthService {
	return {
		logIn: () => {
		},
		logOut: () => {
		},
		isLoggedIn: () => {
		}
	};
});
