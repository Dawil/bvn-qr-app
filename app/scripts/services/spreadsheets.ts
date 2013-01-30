/// <reference path="../main.ts" />
'use strict';

interface ISpreadsheetsService {
	syncData: (string) => ng.IPromise;
	getRows: any;
	getSpreadsheet: any;
	getFormSheet: any;
	addRow: (string) => ng.IPromise;
}
function f(){}
bvnQrApp.factory('spreadsheets',
		<any[]>['$http', '$q', 'bvnProxy', 'googleApiUrl',
		function($http, $q, bvnProxy, googleApiUrl) {
			var f,f;
			var _attendanceSheet = {
				metaData: null,
				rows: null
			}, _formSheet;
			var loadSpreadsheetData = (accessToken) => {
				var f, f;
				var deferred = $q.defer();
				var success = (result) => {
					var f, f;
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
					.as_json()
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
					var deferred = $q.defer();
					var	body = '<entry xmlns="http://www.w3.org/2005/Atom" ' +
													'xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">' +
												'<gsx:person>' + row + '</gsx:person>' +
											'</entry>';
					var metaData = _attendanceSheet.metaData;
					var API_URL = "https://spreadsheets.google.com";
					var API_URL_PATH = "/feeds/list/" +
								metaData['id'] + "/" + "/private/full" +
								"?access_token=" + accessToken;
					var proxyBody = {
						'url_host': API_URL,
						'url_path': API_URL_PATH,
						body: body
					};
					var proxyUrl = "http://localhost:3000/proxy/bounce.json";
					$http({
						method: 'POST',
						data: proxyBody,
						url: proxyUrl
					}).then((result) => {
						console.log(result);
						deferred.resolve( result );
					}, (error) => {
						console.log( error );
						deferred.reject( error );
					});
					return deferred.promise;
				}
			};
		}
	]
);
