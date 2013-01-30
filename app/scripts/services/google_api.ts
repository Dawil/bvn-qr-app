/// <reference path="../main.ts" />
'use strict';

/**
 * This service encapsulates the url construction for Google Spreadsheet API
 * calls. Its purpose is to make sure that no string manipulation of URLs
 * involving the google API occurs outside this service.
 */
interface IGoogleApiUrlService {
	drive: () => IGoogleDriveUrlService;
	spreadsheets: () => IGoogleSpreadsheetsUrlService;
}

interface IGoogleApiService {
	authenticate:(accessToken:string) => IGoogleApiService;
}

interface IGoogleDriveUrlService extends IGoogleApiService {
	files: () => IGoogleDriveUrlService;
}

interface IGoogleSpreadsheetsUrlService extends IGoogleApiService {
	sheet: (sheetId:string) => IGoogleSpreadsheetsUrlService;
	worksheet: (worksheetId:string) => IGoogleSpreadsheetsUrlService;
	asJson: () => IGoogleSpreadsheetsUrlService;
}

bvnQrApp.factory('googleApiUrl',
		<any[]>[
		function():IGoogleApiUrlService {
			return {
			};
		}
	]
);
