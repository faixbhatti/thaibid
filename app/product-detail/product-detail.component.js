/**
 * Created by Afro on 3/23/2017.
 */
'use strict';
angular.module('thai')
    .component('productDetail', {
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
            $scope.cart = $rootScope.cart;
            $scope.loggedIn = $rootScope.loggedIn;
            var input = document.querySelector('#amount');

            $scope.$watch('$root.loggedIn', function(oldValue, newValue) {
                $scope.loggedIn = $rootScope.loggedIn;
            })

            $scope.$watch('$root.cart', function(oldValue, newValue, scope) {
                $scope.cart = $rootScope.cart;
            }, true)

            function get() {
                var id = $routeParams.productId
                products.get().then(function(data) {
                    var products = data.data;
                    var product = products[id - 1] || products[5]
                    $scope.similarProducts = products.slice(0, 4);
                    $scope.otherProducts = products.slice(4, 8);
                    $scope.related = $scope.similarProducts;
                    product.price = Math.round(product.price);
                    $scope.product = product
                    $scope.bidPrice = $scope.product.price + 5

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



            $scope.slideRight = () => {
                $scope.related = $scope.otherProducts;
            }

            $scope.slideOut = function() {
                $scope.related = $scope.similarProducts;
            }

            // $scope.closeInput = function() {
            //     if (window.innerWidth < 601) { //Close input on click outside
            //         if (input.classList.contains('show-bid')) {
            //             if ($rootScope.hideCart) {
            //                 alert('here');
            //                 input.classList.remove('show-bid');
            //                 $scope.hideCart = false;
            //             }
            //         }
            //     }
            // }


            //Show or hide cart button depending on screen size
            function showCart() {
                if (window.innerWidth < 601) {
                    $rootScope.inDetail = true;
                } else {
                    $rootScope.inDetail = false;
                }
            }
            showCart()

            //Scroll to bid history position on window 
            $scope.bidHistory = function() {
                    var bids = document.querySelector('#prod-info'),
                        top = bids.offsetTop;
                    $('.tabs').tabs('select_tab', 'prod-bids')
                    document.body.scrollTop = top;
                    document.documentElement.scrollTop = top;

                }
                //When in mobile view, if user clicks on bid button, display amount input field
            $scope.placeBid = function(product) {
                    if (input.classList.contains('show-bid')) {
                        $scope.addToCart(product) //If input field is visible then add to cart
                        input.classList.remove('show-bid');
                        $scope.hideCart = false;
                    } else {
                        $scope.hideCart = true;
                        input.classList.add('show-bid'); //Else display amount input field
                        $('#amount').focus() //Focus on input field
                        Materialize.toast('Please input a bid amount', 1000);
                    }
                }
                //Display cart sidebar
            $scope.showCart = function() {
                $('.cart-button').sideNav('show');
            }

            $scope.addToCart = function(product) {
                    if ($rootScope.loggedIn) {
                        if ($scope.bidPrice > 150) {
                            $scope.autoBid = true;

                            setTimeout(() => $('.autobid').addClass('animated fadeIn'), 100);

                        }
                        // If window size is mobile or tablet, call the navigator.vibrate() api.
                        if (navigator.vibrate) {
                            navigator.vibrate(200)
                        }
                        if (window.innerWidth < 993) {
                            // Hide input field after user presses enter or submits
                            if (input.classList.contains('show-bid')) {
                                input.classList.remove('show-bid');
                                $scope.hideCart = false; //Display cart button after item is added to cart
                            }
                            Materialize.toast('Item added to cart', 1000) //Display toast when item is added to cart
                            cart.shake() //shake to cart button
                        } else {
                            Materialize.toast('Item added to cart', 1000)
                        }

                        $rootScope.cart.push(product)

                        // Hide alert after 4 secs
                        setTimeout(() => {
                            $('autobid').removeClass('animated fadeOut')
                            $scope.autoBid = false;
                        }, 4000);


                    } else {
                        // Open login modal if user isn't logged in
                        $('#login-modal').modal('open');
                        Materialize.toast('Please log in or sign up', 1000)
                    }

                }
                //          Change images in gallery
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

                setTimeout(() => {
                    Materialize.updateTextFields();
                }, 1000)

                // Scroll to top when page is loaded
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        }
    })