/// <reference path="../app.ts" />
'use strict';

interface IOauth2CallbackScope extends ng.IScope {
	status: () => string;
}

bvnQrApp.controller('Oauth2CallbackCtrl', <any[]>['$scope','$routeParams',
		function($scope:IOauth2CallbackScope, $routeParams:ng.IRouteParamsService) {
	$scope.status = () => {
		if ($routeParams.error) {
			return 'error';
		} else if ($routeParams.access_token) {
			return 'receivingCallback';
		} else {
			return 'invalidLocation';
		}
	};
}]);
