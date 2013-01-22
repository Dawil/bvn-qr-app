/// <reference path="../main.ts" />
'use strict';

interface ISpreadsheetsService {
}

bvnQrApp.factory('spreadsheets',
		<any[]>['$http',
		function($http) {
			var API_URL:string = "https://www.googleapis.com/drive/v2";
			return {
				getSpreadsheets: (accessToken) => {
					var success = (result) => {
						console.log(result);
					}, fail = (error) => {
						console.log(error);
					};
					$http.jsonp(API_URL + "/files?access_token=" + accessToken,
						{	headers: { 'Authorization': 'Bearer ' + accessToken, 'user-agent': 'blah blah blah' } })
						.then(success, fail);
				}
			};
		}
	]
);
