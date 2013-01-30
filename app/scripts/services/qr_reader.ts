/// <reference path="../main.ts" />
'use strict';

interface IQrReaderService {
	scanQr: (any) => ng.IPromise;
}

bvnQrApp.factory( 'qrReader',
	<any[]>[
	function():IQrReaderService {
		var reader = new FileReader();
		function handleFiles(e) {
			reader.onload = function (event) {
			//e.t.r
			var MAX_WIDTH = 200;
			var MAX_HEIGHT = 200;
			img.onload = function () {
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
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height);

			var dataurl = canvas.toDataURL("image/jpeg");
			qrcode.decode(dataurl);
			};
			img.src = event.target.result;
			};
			reader.readAsDataURL(e.target.files[0]);
		}
		return {
			scanQr: (x) => null;
		};
	}]
);
