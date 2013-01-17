/// <reference path="../app.ts" />
'use strict';

interface ILogInScope extends ng.IScope {
	logIn:() => void;
}

bvnQrApp.controller('LogInCtrl', <any[]>['$scope','auth',
		function($scope:ILogInScope, auth) {
	$scope.logIn = auth.logIn;
}]);
