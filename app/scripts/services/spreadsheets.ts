/// <reference path="../main.ts" />
'use strict';

interface ISpreadsheetsService {
	syncData: (string) => ng.IPromise;
	getRows: any;
	getSpreadsheet: any;
	getFormSheet: any;
	addRow: (string) => ng.IPromise;
}

bvnQrApp.factory('spreadsheets',
		<any[]>['$http', '$q',
		function($http, $q) {
			var _attendanceSheet = {
				metaData: null,
				rows: null
			}, _formSheet,
			worksheetId = "od6", // hardcoded to the first worksheet
			loadSpreadsheetData = (accessToken) => {
				var console, console;
				var API_URL:string = "https://www.googleapis.com/drive/v2";
				var deferred = $q.defer();
				var success = (result) => {
					// see http://typescript.codeplex.com/workitem/631
					// aka triple redundancy!!
					var console;
					var console;
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
				$http.jsonp(API_URL + "/files?access_token=" + accessToken + "&callback=JSON_CALLBACK")
					.then(success, fail);
				return deferred.promise;
			}, loadRows = (sheet, accessToken) => {
				console.log(sheet);
				var API_URL = "https://spreadsheets.google.com/feeds/list/"
												+ sheet.id + "/" + worksheetId + "/private/values?alt=json&access_token=" + accessToken + "&callback=JSON_CALLBACK",
						deferred = $q.defer();
				$http.jsonp(API_URL)
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
							console.log(result);
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
								metaData['id'] + "/" + worksheetId + "/private/full" +
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
