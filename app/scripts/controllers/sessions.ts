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
			spreadsheets.getSpreadsheetData(auth.accessToken())
				.then((result) => {
					$scope.sessionSheet = result.attendanceSheet;
					$scope.formSheet = result.formSheet;
					console.log(result);
					spreadsheets.getRows($scope.sessionSheet,
						auth.accessToken())
						.then((result) => {
								console.log(result);
								$scope.sessionRows = result.data.feed.entry;
							}, (error) => { console.log(error) });
				}, (error) =>  { console.log(error) });
		}
	]
);
