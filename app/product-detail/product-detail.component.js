/**
 * Created by Afro on 3/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('productDetail', {
        templateUrl: 'app/product-detail/product-detail.html',
        controller: function($scope, $routeParams, $rootScope, products, cart) {

            $scope.loading = true;
            $scope.showDiv = false;
            $scope.newBid = false;
            $scope.timeLeft = 30;
            $rootScope.showNav = true;
            $rootScope.inCart = false;
            $rootScope.previousPage = `/product/${$routeParams.productId}`;
            $scope.active = 0;
            $scope.clicked = 1;
            $scope.selected = 1;
            var input = document.querySelector('#amount');



            function get() {
                var id = $routeParams.productId
                products.get().then(function(data) {
                    var products = data.data;
                    var product = products[id - 1] || products[5]

                    $scope.similarProducts = products.slice(0, 4)
                    $scope.otherProducts = products.slice(4, 8)
                    product.price = Math.round(product.price);
                    $scope.cart = $rootScope.cart;
                    $scope.loggedIn = $rootScope.loggedIn;

                    $scope.$watch('$root.loggedIn', function(oldValue, newValue) {
                        $scope.loggedIn = $rootScope.loggedIn;
                    })

                    $scope.$watch('$root.cart', function(oldValue, newValue, scope) {
                        $scope.cart = $rootScope.cart;
                    }, true)

                    $scope.product = product
                    $scope.bidPrice = $scope.product.price + 5

                    function showCart(params) {
                        if (window.innerWidth < 601) {
                            $rootScope.inDetail = true;
                        } else {
                            $rootScope.inDetail = false;
                        }
                    }
                    showCart()


                    $scope.imgs = [
                        $scope.product.image,
                        "image/men__fresh-nicks.jpeg",
                        "image/men__fresh-boots.jpeg",
                        "image/men__black-nikes.jpeg"
                    ]

                    $scope.bids = [{
                            "bidder": "John",
                            "amount": 23,
                            "bidTimes": 3,
                            "bidTime": "2017-03-05"
                        },
                        {
                            "bidder": "Peter",
                            "amount": 22.3,
                            "bidTimes": 1,
                            "bidTime": "2017-03-04"
                        },
                        {
                            "bidder": "Charon",
                            "amount": 12.5,
                            "bidTimes": 2,
                            "bidTime": "2017-03-05"
                        },
                        {
                            "bidder": "Robben",
                            "amount": 11.3,
                            "bidTimes": 3,
                            "bidTime": "2017-03-05"
                        },
                        {
                            "bidder": "Afro",
                            "amount": 10,
                            "bidTimes": 3,
                            "bidTime": "2017-03-05"
                        }
                    ]
                    $scope.loading = false

                })

            }

            get()

            $scope.bidHistory = function() {
                var bids = document.querySelector('#bids'),
                    top = bids.offsetTop;
                document.body.scrollTop = top;
                document.documentElement.scrollTop = top;

            }

            $scope.placeBid = function(product) {
                if (input.classList.contains('show-bid')) {
                    $scope.addToCart(product)
                    input.classList.remove('show-bid');
                    $scope.hideCart = false;
                } else {
                    $scope.hideCart = true;
                    input.classList.add('show-bid');
                    $('#amount').focus()
                    Materialize.toast('Please input a bid amount', 200000);
                }
            }

            $scope.showCart = function() {
                $('.cart-button').sideNav('show');
            }

            $scope.addToCart = function(product) {
                if ($rootScope.loggedIn) {
                    if ($scope.bidPrice > 150) {
                        $scope.autoBid = true;

                        function initElement() {
                            $('.autobid').addClass('animated fadeIn')
                        };
                        setTimeout(initElement, 100);

                    }
                    if (navigator.vibrate) {
                        navigator.vibrate(200)
                    }

                    if (window.innerWidth < 993) {
                        if (input.classList.contains('show-bid')) {
                            input.classList.remove('show-bid');
                            $scope.hideCart = false;
                        }
                        Materialize.toast('Item added to cart', 1000)
                        cart.shake()
                    } else {
                        Materialize.toast('Item added to cart', 1000)
                    }

                    $rootScope.cart.push(product)

                    setTimeout(hideAlert, 4000)

                    function hideAlert() {
                        $('autobid').removeClass('animated fadeOut')
                        $scope.autoBid = false;
                    }
                } else {
                    $('#login-modal').modal('open');
                    Materialize.toast('Please log in or sign up', 1000)
                }

            }




            $scope.chgSrc = function(img, index) {
                $scope.product.image = img;
                $scope.active = index
            };



            $(document).ready(function() {
                // ELement Initialisation
                $('.materialboxed').materialbox();
                $('select').material_select();
                $('ul.tabs').tabs();
                $('.tooltipped').tooltip({
                    delay: 50
                });

                // Scroll to top when page is loaded
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        }
    })
})();