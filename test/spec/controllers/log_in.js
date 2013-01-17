'use strict';

describe('LogIn controller test', function() {
	beforeEach(module('bvnQrApp'));

	var LogInCtrl,
		scope,
		auth;

	beforeEach(inject(function($controller) {
		scope = {};
		auth = {
			logIn: sinon.spy()
		};
		LogInCtrl = $controller('LogInCtrl', {
			$scope: scope,
			auth: auth
		});
	}));

	describe('logIn method', function(){
		it('should call auth.logIn', function(){
			scope.logIn();
			expect( auth.logIn.called ).toBe( true );
		});
	});
});
