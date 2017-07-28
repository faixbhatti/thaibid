/**
 * Created by Afro on 4/5/2017.
 */
'use strict';

angular.module('thai')
    .component('userProfile', {
        templateUrl: 'app/profile-page/profile-page.html',
        controller: function($scope, $routeParams, $location, $http, $rootScope, $anchorScroll, ngMeta) {
            const ctrl = this;
            $scope.name = $routeParams.name;
            $rootScope.showNav = true;
            $rootScope.inDetail = false;
            $scope.item = '';
            $rootScope.previousPage = `/user/${$scope.name}`;
            $rootScope.inCart = false;
            ctrl.inMobile = $rootScope.inMobile.matches;

            ctrl.username = $scope.name;

            ngMeta.setTitle(`${$scope.name}'s Profile`, ' | Bidxel.com')

            // Templates to assist in switching between tabs in user profile page;
            $scope.templates = {
                "editProfile": "edit-profile", // Edit profile form. This template displays a form to edit the user profile
                "auctions": "auctions", // Auction template displays all of the user's auctions to date
                "orders": "orders", // Order template displays the orders placed by the user to date
                "cart": "cart", // Cart template displays all items in the user's cart
                "rewards": "rewards" // Rewards cart displays all the rewards user has gotten to date
            };

            // Select a template based on the selection the user has made from another page
            $scope.template = $scope.templates[$rootScope.template];

            // Scroll to the area that displays info about the user if on mobile or tablet
            function goToInfo() {
                if (ctrl.inMobile) {
                    // Only scroll if the user has made a selection from another page
                    // E.g if user has selected to view cart or orders or when user is redirected to complete profile after sign up
                    if ($rootScope.template === 'orders' || $rootScope.template === 'cart' || $rootScope.template === 'editProfile') {
                        $location.hash('user-info');
                        $anchorScroll();
                    }
                }
            }

            goToInfo();

            // Current info of a particular auction or purchase to be displayed by the purchase info modal
            $scope.currentInfo = {};

            // Function to display info about a particular auction based on the user's selection
            ctrl.displayInfo = function(info) {
                $scope.currentInfo = info;
                // trigger modal open
                $('#purchase-modal').modal('open');
            };

            ctrl.auctions = [{
                    "id": 5,
                    "name": "When it goes down",
                    "price": 20.34,
                    "image": "image/pocket.jpg",
                    "timer": "2017-03-24",
                    "won": false
                },
                {
                    "id": 6,
                    "name": "What a view",
                    "price": 40.14,
                    "image": "image/sky.jpg",
                    "timer": "2017-03-25",
                    "won": true
                },
                {
                    "id": 7,
                    "name": "Classic All stars unisex sneakers",
                    "price": 10.32,
                    "image": "image/starz.jpg",
                    "timer": "2017-03-24",
                    "won": false
                },

                {
                    "id": 8,
                    "name": "Ties Collection",
                    "price": 20.34,
                    "image": "image/men__ties.jpeg",
                    "timer": "2017-03-24",
                    "won": true
                }
            ];

            // Function to display info about a particular order in the invoice modal
            ctrl.showInvoice = function(item) {
                $scope.item = item;
                $('#invoice-modal').modal('open')
            };

            ctrl.orders = [{
                    "id": 6,
                    "name": "What a view",
                    "price": 40.14,
                    "quantity": 2,
                    "image": "image/sky.jpg",
                    "timer": "2017-03-25",
                    "invoice": "BCEDND10"
                },
                {
                    "id": 7,
                    "name": "Classic All stars unisex sneakers",
                    "price": 10.32,
                    "quantity": 3,
                    "image": "image/starz.jpg",
                    "timer": "2017-03-24",
                    "invoice": "ECSFD11"

                },
                {
                    "id": 8,
                    "name": "Ties Collection",
                    "price": 20.34,
                    "image": "image/men__ties.jpeg",
                    "timer": "2017-03-24",
                    "quantity": 1,
                    "invoice": "BCEDND12"
                },
                {
                    "id": 9,
                    "name": "Beauty in diversity",
                    "price": 25.90,
                    "image": "image/pocket.jpeg",
                    "timer": "2017-03-24",
                    "quantity": 1,
                    "invoice": "BVNED23"
                }
            ];

            $scope.profImg = 'image/elliot.jpg';

            // While switching tabs, if user is on mobile or tablet, scroll to the display area
            const scrollToDiv = () => {
                if (ctrl.inMobile) {
                    //location hash takes in a the id of an element
                    $location.hash('user-info');

                    // when $anchorScroll is called, window scrolls to the postion of the element entered in the 'location.hash' method
                    $anchorScroll();
                }
            };

            // Function to switch tabs based on the user's selection
            ctrl.switchTab = function(tab) {
                $scope.template = $scope.templates[tab];
                // Trigger scrollToDiv() function
                if (ctrl.inMobile) scrollToDiv();
            };

            ctrl.$onInit = () => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });