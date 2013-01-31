bvn-qr-app
==========

A mobile web page that authenticates with google spreadsheets, reads QR codes and writes to the spreadsheet.

Install
=======

    npm install grunt-typescript

Spec
====

- [ ] A BVN co-ordinator can sign-in and authenticate via google's [OAuth2.0 API](https://developers.google.com/accounts/docs/OAuth2).
- [ ] A BVN co-ordinator can specify a session.
- [ ] A BVN co-ordinator can read a QR code from the web page and identify a BVN employee.
- [ ] A BVN co-ordinator can update a google spreadsheet with a row containing a BVN co-rodinator, a BVN employee and a session.
- [ ] Ideally, a BVN co-ordinator could also do this in batch, selecting a collection of photos of QR codes and then updating the google spreadsheet with all of the appropriate values.

SiteMap
=======

    /										# Displays /login if not logged in, otherwise /sessions
    /welcome						# Displays a login interface
    /sessions						# Displays a list of sessions and an option to create one
    /sessions/:id/show	# Displays an individual session
    /redirect						# The url that catches the google oauth redirect

Sessions
--------

A session has a co-ordinator, attending employees list and an option to scan in a new employee.

Authentication
==============

We create a service, `auth`, which provides the necessary methods to authenticate the user.

    logIn
    logOut
    isLoggedIn

Tests
=====

* should test that `auth` service exists
* test `auth` has the above methods

CORS
====

The same origin policy has prevented me from performing GET and POST requests to different origin servers like the google data servers (spreadsheet api, etc).

What concerns me is that the new CORS standard means that anyone hosting a server somewhere can create a public proxy allowing any javascript in any web browser supporting CORS to bypass the same origin policy. So doesn't CORS completely break any security provided by the same origin policy, and if it does and nobody cares doesn't that mean that the same origin policy is now a redundant pain in the butt and should be deprecated?

see 

    http://stackoverflow.com/questions/6744283/what-is-the-threat-model-for-the-same-origin-policy

and 

    http://blogs.msdn.com/b/ieinternals/archive/2009/08/28/explaining-same-origin-policy-part-1-deny-read.aspx

for an explanation.
