'use strict';

describe('auth service test', function() {
	var auth;

	beforeEach(module('bvnQrApp'));

	beforeEach(inject(function($injector) {
		auth = $injector.get('auth');
	}));

	describe("logInUrl method", function(){
		it('should be defined', function(){
			expect( auth.logInUrl ).toBeDefined();
		});
	});

	describe("logOut method", function(){
		it('should be defined', function(){
			expect( auth.logOut ).toBeDefined();
		});
	});

	describe("isLoggedIn method", function(){
		it('should be defined', function(){
			expect( auth.isLoggedIn ).toBeDefined();
		});
	});
});
