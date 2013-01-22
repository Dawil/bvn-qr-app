/// <reference path="../main.ts" />
'use strict';

interface ISessionsScope {
	sessionSheet: ng.IPromise;
}

bvnQrApp.controller('SessionsCtrl',
		<any[]>['$scope', 'auth', 'spreadsheets',
		function($scope, auth, spreadsheets) {
			spreadsheets.getSessionSpreadsheet(auth.accessToken())
				.then((result) => { $scope.sessionSheet = result; console.log(result) },
							(error) =>  { console.log(error) });
		}
	]
);
