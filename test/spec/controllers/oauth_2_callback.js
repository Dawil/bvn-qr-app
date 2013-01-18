'use strict';

describe('Oauth2Callback controller test', function() {
	beforeEach(module('bvnQrApp'));

	var Oauth2CallbackCtrl,
		routeParams,
		scope;

	beforeEach(inject(function($controller) {
		scope = {};
		routeParams = {};
	}));

	describe('scraping the location', function(){
		// access token
		// expires in
		// token type
		// state
		//   or
		// error
		it('should set status to error if the location contains error', function(){
			routeParams = {
				error: "something"
			};

			Oauth2Callback = $controller('Oauth2CallbackCtrl', {
				$scope: scope,
				$routeParams: routeParams
			});
			expect( $scope.status() ).toBe( 'error' );
		});

		it('should set status to receivingCallback if the location contains access_token', function(){
			routeParams = {
				access_token: "xdcgvbhnj"
			};

			Oauth2Callback = $controller('Oauth2CallbackCtrl', {
				$scope: scope,
				$routeParams: routeParams
			});

			expect( $scope.status() ).toBe( 'receivingCallback' );
		});

		it('should set status to invalidLocation if neither access_token or error are in the lcoation', function(){
			routeParams = {
				not_error: "herp",
				not_access_token: "derp"
			};

			Oauth2Callback = $controller('Oauth2CallbackCtrl', {
				$scope: scope,
				$routeParams: routeParams
			});

			expect( $scope.status() ).toBe( 'invalidLocation' );
		});
	});
});
