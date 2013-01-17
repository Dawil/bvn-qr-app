/// <reference path="../app.ts" />
'use strict';

interface IWelcomeScope extends ng.IScope {
	logInUrl:string;
}

bvnQrApp.controller('WelcomeCtrl', <any[]>['$scope','auth',
		function($scope:IWelcomeScope, auth) {
	$scope.logInUrl = auth.logInUrl;
}]);
