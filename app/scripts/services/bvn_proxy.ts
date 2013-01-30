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
 */
interface IBvnProxyService {
	translate: (config:ng.IRequestConfig) => ng.IRequestConfig;
}

bvnQrApp.factory('bvnProxy',
		<any[]>['$location',
		function($location):IBvnProxyService {
			return {
				translate: (config) => {
					return config;
				}
			}
		}
	]
);
