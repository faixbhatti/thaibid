/**
 * Created by Afro on 3/23/2017.
 */
'use strict';

angular.module('thai')
    .config(['cfpLoadingBarProvider', '$routeProvider', '$locationProvider', '$mdThemingProvider', function(cfpLoadingBarProvider, $routeProvider, $locationProvider, $mdThemingProvider) {

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('teal')

        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html'
            })
            .when('/product/:productId', {
                template: "<product-detail></product-detail>"
            })
            .when('/category/:category', {
                template: "<category></category>"
            })
            .when('/user/:name', {
                template: "<user-profile></user-profile>"
            })
            .when('/checkout', {
                template: '<checkout></checkout>'
            })
            .when('/privacy', {
                template: '<privacy></privacy>'
            })
            .when('/terms', {
                template: '<terms-conditions></terms-conditions>'
            })
            .when('/about', {
                template: '<about></about>'
            })
            .otherwise('/home')

        cfpLoadingBarProvider.includeSpinner = false;
    }])