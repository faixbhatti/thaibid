/**
 * Created by Afro on 4/5/2017.
 */
'use strict';

angular.module('thai')
    .component('userProfile', {
        templateUrl: 'app/profile-page/profile-page.html',
        controller: function($scope, $routeParams, $location, $http, $rootScope, $anchorScroll) {
            $scope.name = $routeParams.name;

            $rootScope.showNav = true;
            $rootScope.inDetail = false;
            $scope.item = '';
            $rootScope.previousPage = `/user/${$scope.name}`;
            $rootScope.inCart = false;



            $scope.templates = {
                "editProfile": "app/profile-page/edit-profile.html",
                "auctions": "app/profile-page/auctions.html",
                "purchases": "app/profile-page/purchases.html",
                "orders": "app/profile-page/orders.html",
                "cart": "app/profile-page/cart.html",
                "rewards": "app/profile-page/rewards.html"
            };

            $scope.template = $scope.templates[$rootScope.template];

            function goToInfo() {
                if ($rootScope.template === 'orders' || $rootScope.template === 'cart') {
                    $location.hash('user-info');
                    $anchorScroll();
                }
            }

            goToInfo()

            $scope.currentInfo = '';

            $scope.displayInfo = function(info) {
                $scope.currentInfo = info;
                $('#purchase-modal').modal('open');
            }

            $scope.auctions = [{
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

            $scope.checkout = function() {
                $rootScope.cart = $scope.auctions;
                $location.url('/checkout');
            }

            $scope.showInvoice = function(item) {
                $scope.item = item;
                $('#invoice-modal').modal('open')
            }

            $scope.orders = [{
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
            ]

            $scope.profImg = 'image/elliot.jpg'

            $scope.uploadImg = function() {
                const input = document.querySelector('.imgUpload');
                input.click()
            }

            $scope.switchTab = function(tab) {
                $scope.template = $scope.templates[tab];
                $location.hash('user-info');
                $anchorScroll();
                if (tab === "editProfile") {
                    setTimeout(function() {
                        $('select.icons').material_select();

                        var data = {};

                        $http.get('https://restcountries.eu/rest/v2/all').then(function(response) {
                            var places = response.data;

                            for (var i = 0; i < places.length; i++) {
                                data[places[i].name] = places[i].flag
                            }

                            $('input.autocomplete').autocomplete({
                                "data": data,
                                limit: 15,
                                minLength: 1
                            })
                        });
                    }, 500)

                } else if (tab === 'purchases') {
                    setTimeout(function() {
                        $('.tooltipped').tooltip({ delay: 50 });
                    }, 500)
                } else if (tab === 'auctions') {
                    setTimeout(function() {
                        $('.tooltipped').tooltip({ delay: 50 });
                    }, 500)
                }
            };

            $(document).ready(function() {
                $('.modal').modal()

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });

        }
    })