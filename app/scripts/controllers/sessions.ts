/// <reference path="../main.ts" />
'use strict';

interface ISessionsScope {
	sessionSheet: any;
	formSheet: any;
	sessionRows: any;
}

bvnQrApp.controller('SessionsCtrl',
		<any[]>['$scope', 'auth', 'spreadsheets',
		function($scope, auth, spreadsheets) {
			spreadsheets.syncData(auth.accessToken());

			$scope.getRows = spreadsheets.getRows;
			$scope.getSpreadsheet = spreadsheets.getSpreadsheet;
			$scope.getFormSheet = spreadsheets.getFormSheet;
		}
	]
);
