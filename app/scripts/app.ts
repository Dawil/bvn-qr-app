/// <reference path="vendor/angular-1.0.d.ts" />
'use strict';

var bvnQrApp = angular.module('bvnQrApp', [])
  .config(<any[]>['$routeProvider', '$locationProvider',
			function($routeProvider, $locationProvider) {
    $routeProvider
			.when('/welcome', {
				templateUrl: 'views/welcome.html',
				controller: 'WelcomeCtrl'
			})
			.when('/oauth2callback', {
				templateUrl: 'views/oauth_2_callback.html',
				controller: 'Oauth2CallbackCtrl'
			})
      .otherwise({
        redirectTo: '/welcome'
      });
		$locationProvider.html5Mode(true);
  }]);
