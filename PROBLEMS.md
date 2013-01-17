Unresolved Problems
===================

Resolved Problems
=================

Google OAuth2.0 and SSL
-----------------------

Authentication of google services requires oauth2.0. This involves a redirect URI which implements https. Unfortunately the Yeoman development server only serves up http, and I could not find any way to add https to it.

This was resolved by ignoring the problem. If I simply edit the redirect URI in the Google API Console to not have an 's' then this seems to work (NB: I have yet to try this but google has not complained yet).
