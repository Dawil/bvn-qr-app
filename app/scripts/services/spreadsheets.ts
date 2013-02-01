/// <reference path="../main.ts" />
'use strict';

interface ISpreadsheetsService {
	syncData: (string) => ng.IPromise;
	getRows: any;
	getSpreadsheet: any;
	getFormSheet: any;
	addRow: (string) => ng.IPromise;
}
function f(){} // used to dodge typescript compiler bug
bvnQrApp.factory('spreadsheets',
		<any[]>['$http', '$q', 'bvnProxy', 'googleApiUrl',
		function($http, $q, bvnProxy, googleApiUrl) {
			var f,f;
			var _attendanceSheet = {
				metaData: null,
				rows: null
			}, _formSheet;
			var loadSpreadsheetData = (accessToken) => {
				var f,f;
				var deferred = $q.defer();
				var success = (result) => {
					var f,f;
					var sheets = result.data.items;
					var formSheet, attendanceSheetMetaData;

					for (var i = 0; i < sheets.length; i++) {
						if (sheets[i].title.search("QR App Test") == 0) {
							if (sheets[i].title.search("Form") != -1) {
								formSheet = sheets[i];
							} else if (sheets[i].title.search("Attendance") != -1) {
								attendanceSheetMetaData = sheets[i];
							}
						}
					}
					deferred.resolve({
						attendanceSheetMetaData: attendanceSheetMetaData,
						formSheet: formSheet
					});
				}, fail = (error) => {
					console.log(error);
				};
				var url = googleApiUrl.drive().files().authenticate( accessToken )
					.toFullUrl() + "&callback=JSON_CALLBACK";
				$http.jsonp( url )
					.then(success, fail);
				return deferred.promise;
			}, loadRows = (sheet, accessToken) => {
				var urlAndParams = googleApiUrl.spreadsheets()
					.sheet( sheet.id )
					.authenticate( accessToken )
					.asJson()
					.toUrlAndParams();
				var deferred = $q.defer();
				$http.jsonp(urlAndParams.url + "?callback=JSON_CALLBACK",
						{ params: urlAndParams.params })
					.then((result) => {
							deferred.resolve(result);
						}, (error) => {
							console.log(error);
							deferred.reject(error);
						});
				return deferred.promise;
			};

			return {
				syncData: (accessToken) => {
					var deferred = $q.defer();
					loadSpreadsheetData(accessToken)
						.then((result) => {
							_attendanceSheet.metaData = result.attendanceSheetMetaData;
							_formSheet = result.formSheet;
							loadRows(_attendanceSheet.metaData, accessToken)
								.then((result) => {
									_attendanceSheet.rows = result;
									deferred.resolve();
								}, (error) => { console.log(error) });
						}, (error) => { console.log( error ) } );
					return deferred.promise;
				}, getRows: () => {
					return _attendanceSheet.rows;
				}, getSpreadsheet: () => {
					return _attendanceSheet.metaData;
				}, getFormSheet: () => {
					return _formSheet;
				}, addRow: (row, accessToken) => {
					var f,f;
					var deferred = $q.defer();
					console.log( "I totally just sent " + row + " to the spreadsheet just now...");
					deferred.resolve();
					return deferred.promise;
					$http( {
						url: "https://script.google.com/a/macros/davidgwilcox.com/s/AKfycbzTJIyUdlhe6cb13ULpz5gRrlq5icQ_fpNIH-J-bLaPl46_F2A/exec",
						method: 'JSONP',
						params: { person: row, callback: 'JSON_CALLBACK', alt: 'json' }
					}).then( (res) => {
						console.log(res);
						deferred.resolve( res );
					});
					return deferred.promise;
				}
			};
		}
	]
);
