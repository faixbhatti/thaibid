/**
 * Created by Afro on 3/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.config(['cfpLoadingBarProvider', '$routeProvider', '$locationProvider', function(cfpLoadingBarProvider, $routeProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);

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
            .otherwise('/home')

        cfpLoadingBarProvider.includeSpinner = false;
    }])
})()