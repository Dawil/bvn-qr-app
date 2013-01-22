/// <reference path="../main.ts" />
'use strict';

interface ISpreadsheetsService {
}

bvnQrApp.factory('spreadsheets',
		<any[]>['$http', '$q',
		function($http, $q) {
			var API_URL:string = "https://www.googleapis.com/drive/v2",
					attendanceSheet,
					formSheet;
			return {
				getSessionSpreadsheet: (accessToken) => {
					var deferred = $q.defer();
					var success = (result) => {
						// see http://typescript.codeplex.com/workitem/631
						// aka triple redundancy!!
						var console;
						var console;
						var sheets = result.data.items;

						for (var i = 0; i < sheets.length; i++) {
							if (sheets[i].title.search("QR App Test") == 0) {
								if (sheets[i].title.search("Form") != -1) {
									formSheet = sheets[i];
								} else if (sheets[i].title.search("Attendance") != -1) {
									attendanceSheet = sheets[i];
								}
							}
						}
						deferred.resolve(attendanceSheet);
					}, fail = (error) => {
						console.log(error);
					};
					$http.jsonp(API_URL + "/files?access_token=" + accessToken + "&callback=JSON_CALLBACK")
						.then(success, fail);
					return deferred.promise;
				}
			};
		}
	]
);
