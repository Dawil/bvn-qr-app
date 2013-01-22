'use strict';
var bvnQrApp = angular.module('bvnQrApp', [
    'ngCookies'
]).config([
    '$routeProvider', 
    '$locationProvider', 
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeCtrl'
        }).when('/sessions', {
            templateUrl: 'views/sessions.html',
            controller: 'SessionsCtrl'
        }).when('/oauth2callback', {
            templateUrl: 'views/oauth_2_callback.html',
            controller: 'Oauth2CallbackCtrl'
        }).otherwise({
            redirectTo: '/welcome'
        });
    }]);
