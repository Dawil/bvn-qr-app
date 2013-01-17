/// <reference path="vendor/angular-1.0.d.ts" />
'use strict';

var bvnQrApp = angular.module('bvnQrApp', [])
  .config(<any[]>['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
				redirectTo: '/welcome'
      })
			.when('/welcome', {
				templateUrl: 'views/welcome.html',
				controller: 'WelcomeCtrl'
			})
      .otherwise({
        redirectTo: '/welcome'
      });
  }]);
