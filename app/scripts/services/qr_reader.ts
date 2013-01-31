/// <reference path="../main.ts" />
'use strict';

declare var qrcode:{ decode: (any) => void; callback: (any) => void; };

interface IQrReaderService {
	scanQr: (any) => ng.IPromise;
}

bvnQrApp.factory( 'qrReader',
	<any[]>['$q', '$rootScope',
	function($q, $rootScope):IQrReaderService {
		return {
			scanQr: (file) => {
				var deferred = $q.defer();
				var reader = new FileReader();
				var img:any = document.createElement("img");
				var canvas:any = document.createElement("canvas");
				reader.onload = (readerOnloadEvent) => {
					img.onload = () => {
						// shrink to maneagable size
						var MAX_WIDTH = 200;
						var MAX_HEIGHT = 200;
						var width = img.width;
						var height = img.height;

						if (width > height) {
							if (width > MAX_WIDTH) {
							height *= MAX_WIDTH / width;
							width = MAX_WIDTH;
							}
						} else {
							if (height > MAX_HEIGHT) {
							width *= MAX_HEIGHT / height;
							height = MAX_HEIGHT;
							}
						}
						canvas.width = width;
						canvas.height = height;
						
						// convert to usable format (DataUrl)
						var ctx = canvas.getContext("2d");
						ctx.drawImage(img, 0, 0, width, height);
						var dataurl = canvas.toDataURL("image/jpeg");

						// Decode
						qrcode.callback = (result) => {
							console.log( result, deferred);
							deferred.resolve(result);
							$rootScope.$apply();
						};
						qrcode.decode(dataurl);
					};
					img.src = readerOnloadEvent.target.result;
				};
				reader.readAsDataURL(file);
				deferred.promise.then( () => {console.log("qr decoded, deferred resolved")});
				return deferred.promise;
			}
		};
	}]
);
