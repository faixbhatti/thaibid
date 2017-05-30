/**
 * Created by Afro on 3/29/2017.
 */
'use strict';

angular.module('thai')
    .component('category', {
        templateUrl: 'app/product-category/product-category.html',
        controller: function($routeParams, $scope, $rootScope, products) {
            $scope.dataLoading = true;

            function get() {
                products.get().then(function(data) {
                    var products = data.data;
                    $scope.products = products
                    $scope.limit = 35;
                    $scope.dataLoading = false;
                })
            }
            get()

            $rootScope.inDetail = false;
            $rootScope.showNav = true;

            var extras = [{
                    "id": 21,
                    "name": "Classic beach wear",
                    "price": 20.34,
                    "image": "image/leather-bag.jpg",
                    "timer": "2017-03-24"
                },
                {
                    "id": 22,
                    "name": "All black swagger",
                    "price": 23.53,
                    "image": "image/men__black-converse.jpeg",
                    "timer": "2017-03-24"
                },
                {
                    "id": 23,
                    "name": "Dirty ass shoes",
                    "price": 44.34,
                    "image": "image/men__dirty-shoes.jpeg",
                    "timer": "2017-03-24"
                },
                {
                    "id": 24,
                    "name": "On a sunny day",
                    "price": 20.34,
                    "image": "image/men__mad-shades.jpeg",
                    "timer": "2017-03-24"
                }
            ]

            var loading = false;

            $rootScope.inCart = false;

            $scope.loadMore = function(e) {
                var scroll = window.scrollY,
                    documentHeight = document.body.clientHeight,
                    windowHeight = window.innerHeight;

                if (scroll >= (documentHeight - windowHeight) * 0.70) {

                    if (!loading) {
                        loading = true
                        $scope.loading = true;

                        setTimeout(() => {
                            $scope.loading = false;
                            $scope.products.push(...extras)
                        }, 2000)
                    }

                }

            }

            $scope.category = $routeParams.category

            $rootScope.previousPage = `/category/${$scope.category}`

            $(document).ready(function() {
                $('.tooltipped').tooltip({
                    delay: 50
                })

                document.addEventListener('scroll', $scope.loadMore)

                $(".dropdown-button").dropdown();

                $(".dropdown-content > li").on('click', function() {
                    setTimeout(() => {
                        $(".dropdown-button").dropdown("close");
                    }, 300)
                })

                var slider = document.getElementById('uiSlider');
                noUiSlider.create(slider, {
                    start: [20, 300],
                    connect: true,
                    step: 10,
                    range: {
                        'min': 10,
                        'max': 1000
                    }
                });

                slider.noUiSlider.on('update', function(values, handle) {
                    if (handle === 1) {
                        $scope.left = values[handle]
                    } else {
                        $scope.right = values[handle]
                    }
                });

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            })

        }
    })