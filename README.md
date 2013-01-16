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

/
/login
/sessions
/sessions/new
/sessions/:id/show
