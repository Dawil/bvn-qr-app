/// <reference path="../main.ts" />
'use strict';

interface ISessionsScope {
	sessionSheet: any;
	formSheet: any;
	sessionRows: any;
	addRow: () => void;
	newAttendee: string;
}

bvnQrApp.controller('SessionsCtrl',
		<any[]>['$scope', 'auth', 'spreadsheets', 'qrReader',
		function($scope, auth, spreadsheets, qrReader) {
			spreadsheets.syncData(auth.accessToken());

			$scope.getRows = spreadsheets.getRows;
			$scope.getSpreadsheet = spreadsheets.getSpreadsheet;
			$scope.getFormSheet = spreadsheets.getFormSheet;

			$scope.addRow = () => {
				spreadsheets.addRow($scope.newAttendee, auth.accessToken());
			};

			$scope.scanQr = (image) => {
				var file = image.files[0];
				console.log( "start" );
				var x = qrReader.scanQr( file );
				console.log( "end" );
				console.log( x );
				x.then( (attendeeEmail) => {
						console.log( "sending email" );
						console.log( attendeeEmail );
						spreadsheets.addRow( attendeeEmail, auth.accessToken() );
					});
			};
		}
	]
);
