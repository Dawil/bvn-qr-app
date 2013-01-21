Unresolved Problems
===================

Confused Deputy Problem and Unvalidated Access Tokens
-----------------------------------------------------

As per

    https://developers.google.com/accounts/docs/OAuth2UserAgent

we are not yet validating the token to mitigate the Confused Deputy Problem.

Yeoman Build Environments
-------------------------

Currently I cannot find a way to include differeing files between the development environment and the production build environmnet.

The reason why I want to do this is so that I can have a different Google API client id for development and production.

Resolved Problems
=================

Google OAuth2.0 and SSL
-----------------------

Authentication of google services requires oauth2.0. This involves a redirect URI which implements https. Unfortunately the Yeoman development server only serves up http, and I could not find any way to add https to it.

This was solved by creating a second html page, oauth2callback.html. Google redirects to here, and it then uses javascript to redirect to the correct angularjs route.

Testacular Watch Interval Too Quick
-----------------------------------

Testacular is watching the filesystem for changes, before running the tests again. Unfortunately, when the watch interval gets small, it stops working with vim. This is because when vim saves a file it first moves it, then writes the new version to the original filename. Chokitar, which testacular uses, was polling at 100ms, which was apparently fast enough to catch the time in between when there was no file to run. The final result was testacular saw saving as deleting.

This was solved with the following change to my vimrc file.

		""    'yes'   make a copy of the file and overwrite the original one
		""    'no'    rename the file and write a new one
		""    'auto'  one of the previous, what works best
		set backupcopy=yes

Testacular Running Tests Twice
------------------------------

Testacular was running all of the tests twice, clogging up the terminal space. On startup it was loading phantomjs twice:

		$ testacular start
		info: Testacular server started at http://localhost:8080/
		info (launcher): Starting browser PhantomJS
		info (PhantomJS 1.7): Connected on socket id 3j5z0kP2ddTXso42RAGM
		info (PhantomJS 1.7): Connected on socket id RBjw_Sd75a3VOLM5RAGN

This was resolved by removing the line in the testacular.conf.js file which included phantomjs. It seems that phantomjs is being included elsewhere as well, or as a default. I still do not know where.
