/**
 * Created by Afro on 3/23/2017.
 */
'use strict';

angular.module('thai')
    .config(['cfpLoadingBarProvider', '$routeProvider', '$locationProvider', '$mdThemingProvider', 'ngMetaProvider', function(cfpLoadingBarProvider, $routeProvider, $locationProvider, $mdThemingProvider, ngMetaProvider) {

        $locationProvider.html5Mode(true);

        ngMetaProvider.useTitleSuffix(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue-grey');

        $routeProvider
            .when('/', {
                template: "<home-page></home-page>",
                data: {
                    meta: {
                        'title': 'Bidxel bids. The home of smart bidding',
                        'description': 'A great bidding site for all auctions'
                    }
                }
            })
            .when('/product/:productId', {
                template: `<product-detail>
                <div>
                    <div class="detail-placeholder row">
                        <div class="col s6">
                            <div class="card blue-grey lighten-2"></div>
                        </div>
                        <div class="col s6">
                            <div class="card white" style="height: 600px;"></div>
                        </div>
                    </div>
                </div>
            </product-detail>`
            })
            .when('/category/:category', {
                template: "<category></category>"
            })
            .when('/user/:name', {
                template: "<user-profile></user-profile>"
            })
            .when('/checkout', {
                template: '<checkout></checkout>',
                data: {
                    meta: {
                        'title': 'Checkout',
                        'titleSuffix': ' | Bidxel.com'
                    }
                }
            })
            .when('/privacy', {
                template: '<privacy></privacy>',
                data: {
                    meta: {
                        'title': 'Privacy Agreement',
                        'titleSuffix': ' | Bidxel.com'
                    }
                }
            })
            .when('/terms', {
                template: '<terms-conditions></terms-conditions>',
                data: {
                    meta: {
                        'title': 'Terms and Conditions',
                        'titleSuffix': ' | Bidxel.com'
                    }
                }
            })
            .when('/about', {
                template: '<about></about>',
                data: {
                    meta: {
                        'title': 'About Us',
                        'titleSuffix': ' | Bidxel.com'
                    }
                }
            })
            .when('/redeem-shop', {
                template: '<app-redeem-shop></app-redeem-shop>',
                data: {
                    meta: {
                        'title': 'Redeem Shop',
                        'titleSuffix': ' | Bidxel.com'
                    }
                }
            })
            .otherwise('/')

        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .run(function($rootScope, ngMeta) {
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
        $rootScope.hasDeleted = false;
        ngMeta.init();
    });