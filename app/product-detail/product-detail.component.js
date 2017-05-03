/**
 * Created by Afro on 3/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('productDetail', {
        templateUrl: 'app/product-detail/product-detail.html',
        controller: function($scope, $routeParams, $rootScope, products) {
            $scope.loading = true;

            function get() {
                var id = $routeParams.productId
                products.get().then(function(data) {
                    var products = data.data;
                    var product = products[id - 1] || products[5]

                    $scope.similarProducts = products.slice(0, 4)
                    $scope.otherProducts = products.slice(4, 8)
                    product.price = Math.round(product.price)

                    $scope.product = product
                    $scope.loading = false

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
                })

            }

            get()

            $scope.timeLeft = 30;

            $rootScope.showNav = true;

            $rootScope.inCart = false;

            $rootScope.previousPage = `/product/${$routeParams.productId}`

            $scope.addToCart = function(product) {
                if ($scope.bidPrice > 150) {
                    $scope.autoBid = true;

                    function initElement() {
                        $('.autobid').addClass('animated fadeIn')
                    };
                    setTimeout(initElement, 100);

                }
                Materialize.toast('Item added to cart', 2000)


                $rootScope.cart.push(product)

                setTimeout(hideAlert, 4000)

                function hideAlert() {
                    $('autobid').removeClass('animated fadeOut')
                    $scope.autoBid = false;
                }
            }

            $scope.showDiv = false;
            $scope.newBid = false;

            $(document).ready(function() {
                // ELement Initialisation
                $('.materialboxed').materialbox();
                $('select').material_select();
                $('ul.tabs').tabs();
                $('.tooltipped').tooltip({
                    delay: 50
                });
                setInterval(function() {
                        Materialize.updateTextFields();
                    }, 1000)
                    // End element init

                // ScrollFire for product suggestions
                var options = [{
                    selector: '#others',
                    offset: 50,
                    callback: function(el) {
                        $('#others').addClass('animated slideInUp')
                    }
                }];
                Materialize.scrollFire(options)
                    // End sScrollFire for product suggestions

                // Scroll to top when page is loaded
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;


                // Pin gallery to point whilst scrolling
                var header = document.querySelector('#header'),
                    detArea = document.querySelector('#dets'),
                    offset = header.offsetHeight + 50,
                    bottom = detArea.clientHeight - 320;

                $('.prod-detail').pushpin({
                    top: $('.prod-detail').offset().top,
                    offset: offset,
                    bottom: bottom - offset
                });
                // End gallery pin
            });

            $scope.active = 0;

            $scope.chgSrc = function(img, index) {
                $scope.product.image = img;
                $scope.active = index
            };


        }

    })
})();