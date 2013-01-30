/// <reference path="../main.ts" />
'use strict';

/**
 * This service encapsulates the url construction for Google Spreadsheet API
 * calls. Its purpose is to make sure that no string manipulation of URLs
 * involving the google API occurs outside this service.
 */
interface IGoogleApiUrlService {
	drive: () => GoogleDriveUrl;
	spreadsheets: () => GoogleSpreadsheetsUrl;
}

class GoogleApiUrl {
	_url:string;
	_accessToken:string;
	constructor(){}

	authenticate(accessToken:string):GoogleApiUrl {
		this._accessToken = accessToken;
		return this;
	}

	_toString():string {
		return this._url;
	}

	toString():string {
		if (this._accessToken) {
			return this._toString() + "?access_token=" + this._accessToken;
		} else {
			return this._toString();
		}
	}
}

class GoogleDriveUrl extends GoogleApiUrl {
	_files:string;
	constructor(){
		super();
		this._url = "https://www.googleapis.com/drive/v2";
	}

	files() {
		this._files = "files";
		return this;
	}

	_toString() {
		if (this._files) {
			return [this._url, this._files].join("/");
		} else {
			return this._url;
		}
	}
}

class GoogleSpreadsheetsUrl extends GoogleApiUrl {
	_sheetId:string;
	_worksheetId:string;
	_privateOrPublic:string;
	_fullOrBasic:string;

	constructor() {
		super();
		this._url = "https://spreadsheets.google.com/feeds/list";
		this._worksheetId = "od6";
		this._privateOrPublic = "private";
		this._fullOrBasic = "full";
	}

	sheet(sheetId) {
		this._sheetId = sheetId;
		return this;
	}

	worksheet(worksheetId) {
		this._worksheetId = worksheetId;
		return this;
	}

	suffix() {
		return [this._worksheetId, this._privateOrPublic, this._fullOrBasic]
			.join('/');
	}

	_toString() {
		if (this._sheetId) {
			return [this._url, this._sheetId, this.suffix()]
								.join("/");
		} else {
			return this._url;
		}
	}
}

bvnQrApp.factory('googleApiUrl',
		<any[]>[
		function():IGoogleApiUrlService {
			return {
				drive: () => new GoogleDriveUrl(),
				spreadsheets: () => new GoogleSpreadsheetsUrl()
			};
		}
	]
);
