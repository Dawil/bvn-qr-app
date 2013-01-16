'use strict';

describe('auth service test', function() {
	var auth;
	beforeEach(function(){
		var $injector = angular.injector([ 'bvnQrApp' ]);
		auth = $injector.get( 'auth' );
	});

	it('should have a logIn method', function(){
		expect( auth.logIn ).toBeDefined();
	});
});
