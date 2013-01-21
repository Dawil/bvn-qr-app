'use strict';

describe('spreadsheets service test', function() {
	var spreadsheets;

	beforeEach(module('bvnQrApp'));

	beforeEach(inject(function($injector) {
		spreadsheets = $injector.get('spreadsheets');
	}));

	describe("getSpreadsheets method", function(){
		it('should be defined', function(){
			expect( spreadsheets.getSpreadsheets ).toBeDefined();
		});
	});
});
