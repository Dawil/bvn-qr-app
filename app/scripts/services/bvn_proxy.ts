/// <reference path="../main.ts" />
'use strict';

/**
 * This service encapsulates the url construction for the BVN Proxy. Given an
 * angularjs $http config object it will return a new one which will use the
 * CORS compatible BVN Proxy server.
 *
 * It injects the $location service so that it can send to different URLS
 * depending upon the environment (i.e. localhost in dev, heroku in
 * production).
 *
 * It is recommended to use JSONP if you only need a GET request. JSONP will
 * have a much reduced latency due to the lack of an extra request call.
 */
interface IBvnProxyService {
	translate: (config:ng.IRequestConfig) => ng.IRequestConfig;
}

bvnQrApp.factory('bvnProxy',
		<any[]>['$window',
		function($window):IBvnProxyService {
			var PROXY_URL:string = $window.location.origin.search('localhost') != -1 ?
				"http://localhost:3000/proxy/bounce" : "http://aqueous-harbor-1616.herokuapp.com/proxy/bounce";
			return {
				translate: (config) => {
					var targetUrl = config.url;
					config.url = PROXY_URL;
					if (config.method === 'GET') {
						config.params['target_url'] = targetUrl;
					} else if (config.method === 'POST') {
						var data = config.data;
						config.data = {
							'target_url': targetUrl,
							data: data
						};
					}
					return config;
				}
			}
		}
	]
);
