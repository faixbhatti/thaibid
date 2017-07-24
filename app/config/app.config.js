/**
 * Created by Afro on 3/23/2017.
 */
'use strict';

angular.module('thai')
    .config(['cfpLoadingBarProvider', '$routeProvider', '$locationProvider', '$mdThemingProvider', function(cfpLoadingBarProvider, $routeProvider, $locationProvider, $mdThemingProvider) {

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue-grey');

        $routeProvider
            .when('/', {
                template: "<home-page></home-page>"
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
            .when('/redeem-shop', {
                template: '<app-redeem-shop></app-redeem-shop>'
            })
            .otherwise('/')

        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .run(function($rootScope) {
        $rootScope.showNav = true;
        $rootScope.previousPage = "/home";
        $rootScope.cart = [];
        $rootScope.inCart = false;
        $rootScope.inDetail = false;
        $rootScope.template = 'auctions';
        $rootScope.inMobile = window.matchMedia('(max-width: 993px)');
        $rootScope.loggedIn = false;
        $rootScope.user = {};
        $rootScope.shopRedeem = false;
        $rootScope.searching = false;
    });