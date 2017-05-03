/**
 * Created by Afro on 4/5/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('userProfile', {
        templateUrl: 'app/profile-page/profile-page.html',
        controller: function($scope, $routeParams, $http, $rootScope) {
            $scope.name = $routeParams.name;

            $scope.templates = {
                "editProfile": "app/profile-page/edit-profile.html",
                "auctions": "app/profile-page/auctions.html",
                "purchases": "app/profile-page/purchases.html",
                "orders": "app/profile-page/orders.html",
                "cart": "app/profile-page/cart.html",
                "rewards": "app/profile-page/rewards.html"
            };

            $scope.currentInfo = '';

            $scope.displayInfo = function(info) {
                $scope.currentInfo = info;
            }

            $rootScope.previousPage = `/user/${$scope.name}`;
            $rootScope.inCart = false;


            $scope.blurImg = function() {
                var img = document.querySelector('.prof-img'),
                    imgFilter = img.style.filter;

                if (imgFilter === "blur(1px)") {
                    img.style.filter = "blur(0)"
                } else {
                    img.style.filter = "blur(1px)"
                }
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

            $scope.profImg = 'image/elliot.jpg'


            $scope.template = $scope.templates.auctions;

            $scope.uploadImg = function() {
                const input = document.querySelector('.imgUpload');
                input.click()
            }

            $scope.switchTab = function(tab) {
                $scope.template = $scope.templates[tab];

                if (tab === "editProfile") {
                    setTimeout(function() {
                        $('select').material_select();

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

                $(document).ready(function() {
                    $('#profile').pushpin({
                        top: 50,
                        bottom: 1000,
                        offset: 0
                    });

                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                });
            };

        }
    })
})();