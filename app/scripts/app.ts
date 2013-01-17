/// <reference path="vendor/angular-1.0.d.ts" />
'use strict';

var bvnQrApp = angular.module('bvnQrApp', [])
  .config(<any[]>['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
				redirectTo: '/log_in'
      })
			.when('/log_in', {
				templateUrl: 'views/log_in.html',
				controller: 'LogInCtrl'
			})
      .otherwise({
        redirectTo: '/log_in'
      });
  }]);
