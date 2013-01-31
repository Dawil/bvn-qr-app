var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
'use strict';
bvnQrApp.factory('googleApiUrl', [
    function () {
        return {
            drive: function () {
                return new GoogleDriveUrl();
            },
            spreadsheets: function () {
                return new GoogleSpreadsheetsUrl();
            }
        };
    }]);
var GoogleApiUrl = (function () {
    function GoogleApiUrl() {
    }
    GoogleApiUrl.prototype.authenticate = function (accessToken) {
        this._accessToken = accessToken;
        return this;
    };
    GoogleApiUrl.prototype._toUrlAndParams = function () {
        return {
            url: this._url,
            params: {
            }
        };
    };
    GoogleApiUrl.prototype.toUrlAndParams = function () {
        var urlAndParams = this._toUrlAndParams();
        if(this._accessToken) {
            urlAndParams.params['access_token'] = this._accessToken;
        }
        return urlAndParams;
    };
    GoogleApiUrl.prototype.toFullUrl = function () {
        var urlAndParams = this.toUrlAndParams();
        if(urlAndParams.params['access_token']) {
            return urlAndParams.url + '?access_token=' + urlAndParams.params['access_token'];
        } else {
            return urlAndParams.url;
        }
    };
    return GoogleApiUrl;
})();
var GoogleDriveUrl = (function (_super) {
    __extends(GoogleDriveUrl, _super);
    function GoogleDriveUrl() {
        _super.call(this);
        this._url = "https://www.googleapis.com/drive/v2";
    }
    GoogleDriveUrl.prototype.files = function () {
        this._files = "files";
        return this;
    };
    GoogleDriveUrl.prototype._toUrlAndParams = function () {
        var url;
        if(this._files) {
            url = [
                this._url, 
                this._files
            ].join("/");
        } else {
            url = this._url;
        }
        return {
            url: url,
            params: {
            }
        };
    };
    return GoogleDriveUrl;
})(GoogleApiUrl);
var GoogleSpreadsheetsUrl = (function (_super) {
    __extends(GoogleSpreadsheetsUrl, _super);
    function GoogleSpreadsheetsUrl() {
        _super.call(this);
        this._url = "https://spreadsheets.google.com/feeds/list";
        this._worksheetId = "od6";
        this._privateOrPublic = "private";
        this._fullOrBasic = "full";
    }
    GoogleSpreadsheetsUrl.prototype.sheet = function (sheetId) {
        this._sheetId = sheetId;
        return this;
    };
    GoogleSpreadsheetsUrl.prototype.worksheet = function (worksheetId) {
        this._worksheetId = worksheetId;
        return this;
    };
    GoogleSpreadsheetsUrl.prototype.asJson = function (flag) {
        if (typeof flag === "undefined") { flag = true; }
        this._json = flag;
        return this;
    };
    GoogleSpreadsheetsUrl.prototype.suffix = function () {
        return [
            this._worksheetId, 
            this._privateOrPublic, 
            this._fullOrBasic
        ].join('/');
    };
    GoogleSpreadsheetsUrl.prototype._toUrlAndParams = function () {
        var url;
        if(this._sheetId) {
            url = [
                this._url, 
                this._sheetId, 
                this.suffix()
            ].join("/");
        } else {
            url = this._url;
        }
        var params = {
        };
        if(this._json) {
            params['alt'] = 'json';
        }
        return {
            url: url,
            params: params
        };
    };
    return GoogleSpreadsheetsUrl;
})(GoogleApiUrl);
