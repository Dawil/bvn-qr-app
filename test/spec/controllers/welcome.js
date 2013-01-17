'use strict';

describe('Welcome controller test', function() {
	beforeEach(module('bvnQrApp'));

	var WelcomeCtrl,
		scope,
		auth;

	beforeEach(inject(function($controller) {
		scope = {};
		auth = {
			logInUrl: 'logInUrl',
			logOut: function(){},
			isLoggedIn: function(){}
		};
		WelcomeCtrl = $controller('WelcomeCtrl', {
			$scope: scope,
			auth: auth
		});
	}));

	describe('logInUrl property', function(){
		it('should be a string', function(){
			expect( typeof scope.logInUrl ).toBe( 'string' );
			//expect( auth.logIn.called ).toBe( true );
		});
	});
});
