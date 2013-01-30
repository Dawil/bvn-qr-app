/// <reference path="../main.ts" />
'use strict';

/**
 * This service encapsulates the url construction for Google Spreadsheet API
 * calls. Its purpose is to make sure that no string manipulation of URLs
 * involving the google API occurs outside this service.
 */
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

interface IGoogleApiUrlService {
	drive: () => GoogleDriveUrl;
	spreadsheets: () => GoogleSpreadsheetsUrl;
}

interface UrlAndParams {
	url:string;
	params:any;
}

class GoogleApiUrl {
	_url:string;
	_accessToken:string;
	constructor(){}

	authenticate(accessToken:string):GoogleApiUrl {
		this._accessToken = accessToken;
		return this;
	}

	_toUrlAndParams():UrlAndParams {
		return  { url: this._url, params: {} };
	}

	toUrlAndParams():UrlAndParams {
		var urlAndParams = this._toUrlAndParams();
		if (this._accessToken) {
			urlAndParams.params['access_token'] = this._accessToken;
		}
		return urlAndParams
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

	_toUrlAndParams():UrlAndParams {
		var url;
		if (this._files) {
			url = [this._url, this._files].join("/");
		} else {
			url = this._url;
		}
		return { url: url, params: {} };
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

	_toUrlAndParams():UrlAndParams {
		var url;
		if (this._sheetId) {
			url = [this._url, this._sheetId, this.suffix()]
								.join("/");
		} else {
			url = this._url;
		}
		return { url: url, params: {} };
	}
}
