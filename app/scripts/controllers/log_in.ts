/// <reference path="../app.ts" />
'use strict';

interface ILogInScope extends ng.IScope {
	logIn:() => void;
}

bvnQrApp.controller('LogInCtrl', <any[]>['$scope', function($scope:ILogInScope) {
	$scope.logIn = () => {
		alert("Hello");
	};
}]);
