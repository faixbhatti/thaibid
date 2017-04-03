/**
 * Created by Afro on 3/23/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');

    app.config(['cfpLoadingBarProvider', '$routeProvider', '$locationProvider', function (cfpLoadingBarProvider, $routeProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);

        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html'
            })
            .when('/product/:productId', {
                template: "<product-detail></product-detail>"
            })
            .when('/:category',{
                template: "<category></category>"
            })
            .otherwise('/home')

        cfpLoadingBarProvider.includeSpinner = false;
    }])
})()