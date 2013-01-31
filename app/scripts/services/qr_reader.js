'use strict';
bvnQrApp.factory('qrReader', [
    '$q', 
    '$rootScope', 
    function ($q, $rootScope) {
        return {
            scanQr: function (file) {
                var deferred = $q.defer();
                var reader = new FileReader();
                var img = document.createElement("img");
                var canvas = document.createElement("canvas");
                reader.onload = function (readerOnloadEvent) {
                    img.onload = function () {
                        var MAX_WIDTH = 200;
                        var MAX_HEIGHT = 200;
                        var width = img.width;
                        var height = img.height;
                        if(width > height) {
                            if(width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if(height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataurl = canvas.toDataURL("image/jpeg");
                        qrcode.callback = function (result) {
                            console.log(result, deferred);
                            deferred.resolve(result);
                            $rootScope.$apply();
                        };
                        qrcode.decode(dataurl);
                    };
                    img.src = readerOnloadEvent.target.result;
                };
                reader.readAsDataURL(file);
                deferred.promise.then(function () {
                    console.log("qr decoded, deferred resolved");
                });
                return deferred.promise;
            }
        };
    }]);
