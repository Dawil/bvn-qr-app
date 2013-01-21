/// <reference path="../main.ts" />
'use strict';

interface ISessionsScope {
}

bvnQrApp.controller('SessionsCtrl',
		<any[]>['$scope', 'auth', 'spreadsheets',
		function($scope, auth, spreadsheets) {
			spreadsheets.getSpreadsheets(auth.accessToken());
		}
	]
);
