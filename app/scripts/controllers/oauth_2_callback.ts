/// <reference path="../main.ts" />
'use strict';

interface IOauth2CallbackScope extends ng.IScope {
	status: () => string;
}

bvnQrApp.controller('Oauth2CallbackCtrl',
		<any[]>['$scope','$routeParams', 'auth', '$location',
		function($scope:IOauth2CallbackScope, $routeParams, auth:IAuthService, $location:ng.ILocationService) {
	$scope.status = () => {
		if ($routeParams.error) {
			return 'error';
		} else if ($routeParams.access_token) {
			return 'receivingCallback';
		} else {
			return 'invalidLocation';
		}
	};

	if ($scope.status() == 'receivingCallback') {
		auth.accessToken( $routeParams.access_token );
		$location.path('/sessions');
	} else {
		$location.path('/welcome');
	}
}]);
