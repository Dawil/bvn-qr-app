/// <reference path="vendor/angular-1.0.d.ts" />
'use strict';

var bvnQrApp = angular.module('bvnQrApp', [])
  .config(<any[]>['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
