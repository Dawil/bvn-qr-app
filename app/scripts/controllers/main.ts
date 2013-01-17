/// <reference path="../app.ts" />
'use strict';

interface IMainScope extends ng.IScope {
	awesomeThings:string[];
}

bvnQrApp.controller('MainCtrl', <any[]>['$scope', function($scope:IMainScope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Testacular'
  ];
}]);
