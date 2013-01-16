'use strict';

describe('auth service test', function() {
	var auth;
	beforeEach(module('bvnQrApp'));

	beforeEach(inject(function($injector) {
		auth = $injector.get('auth');
	}));

	it('should have a logIn method', function(){
		expect( auth.logIn ).toBeDefined();
	});

	it('should have a logOut method', function(){
		expect( auth.logOut ).toBeDefined();
	});

	it('should have an isLoggedIn method', function(){
		expect( auth.isLoggedIn ).toBeDefined();
	});
});
