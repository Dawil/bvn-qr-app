'use strict';

describe('google api service test', function() {
	var googleApiUrl;

	beforeEach(module('bvnQrApp'));
	beforeEach(inject(function($injector) {
		googleApiUrl = $injector.get('googleApiUrl');
	}));

	describe('drive urls', function(){
		var drive;

		beforeEach(function(){
			drive = googleApiUrl.drive();
		});

		it('should authenticate', function(){
			var accessToken = "super secrect key";
			expect( drive.authenticate( accessToken ).toUrlAndParams()
				.params['access_token'] ).toBe( accessToken );
		});

		it('should set the correct base url', function(){
			expect( drive.toUrlAndParams().url )
				.toBe( "https://www.googleapis.com/drive/v2" );
		});

		it('should set the correct files url', function(){
			expect( drive.files().toUrlAndParams().url )
				.toBe( "https://www.googleapis.com/drive/v2/files" );
		});
	});

	describe('spreadsheets urls', function(){
		var spreadsheets;

		beforeEach(function(){
			spreadsheets = googleApiUrl.spreadsheets();
		});

		it('should authenticate', function(){
			var accessToken = "super secrect key";
			expect( spreadsheets.authenticate( accessToken ).toUrlAndParams()
				.params['access_token'] ).toBe( accessToken );
		});

		it('should set the correct base url', function(){
			expect( spreadsheets.toUrlAndParams().url )
				.toBe( "https://spreadsheets.google.com/feeds/list" );
		});

		describe('sheets', function(){
			var sheet, spreadsheetsUrl, sheetId;

			beforeEach(function(){
				sheetId = "abba";
				sheet = spreadsheets.sheet( sheetId );
			});

			it('should automatically append the suffix if sheet is defined', function(){
				expect( sheet.toUrlAndParams().url.search( "od6/private/full" ) > -1 )
					.toBe( true );
			});

			describe('worksheets', function(){
				var worksheet;

				beforeEach(function(){
					worksheet = sheet.worksheet( "baab" );
				});

				it('should add worksheet ids correctly', function(){
					expect( worksheet.toUrlAndParams().url.search( "baab" ) > -1 )
						.toBe( true );
				});

				it('should set private by default', function(){
					expect( worksheet.toUrlAndParams().url.search( "private" ) > -1 )
						.toBe( true );
				});

				it('should set full by default', function(){
					expect( worksheet.toUrlAndParams().url.search( "full" ) > -1 )
						.toBe( true );
				});
			});
		});
	});
});
