/**
 * Created by Afro on 3/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('productDetail', {
        templateUrl: 'app/product-detail/product-detail.html',
        controller: function($scope, $routeParams, $rootScope, products) {
            function get() {
                products.get().then(function(data) {
                    var products = data.data;
                    $scope.similarProducts = products.slice(0, 4)
                    var product = products[$routeParams.productId - 1]
                    product.price = Math.round(product.price)
                    $scope.product = product
                    $scope.imgs = [
                        $scope.product.image,
                        "image/men__fresh-nicks.jpeg",
                        "image/men__fresh-boots.jpeg",
                        "image/men__black-nikes.jpeg"
                    ]
                })
            }

            get()

            $scope.timeLeft = 30;

            $rootScope.showNav = true;

            $rootScope.previousPage = '#!/product/' + $routeParams.productId

            $scope.restartTimer = function() {
                $scope.timeOut = true;
                // Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
                setTimeout(function() {
                    $('.timeout').addClass('animated fadeIn')
                }, 200)

                setTimeout(function() {
                    $('.timeout')
                        .addClass('fadeOut')
                        .removeClass('animated fadeIn fadeOut')

                    $scope.timeOut = false;
                    $scope.$broadcast('timer-reset');
                    $scope.$broadcast('timer-start');

                }, 6000)
            };


            $scope.addToCart = function(product) {
                $rootScope.cart.push(product)
                Materialize.toast('Item added to cart', 2000)
            }


            $scope.timeOut = false;
            $scope.newBid = false;

            $scope.$on('timer-tick', function(event, args) {
                if (args.millis <= 10000) {
                    if (!$('.timer').hasClass('red-text') && !$('#time-icon').hasClass('red-text')) {
                        $('.timer').addClass('red-text');
                        $('#time-icon').addClass('animated flash infinite red-text');
                    }
                } else if (args.millis === 20000) {
                    $scope.newBid = true;

                    function initElement() {
                        $scope.product.price += 5
                        $('.newbid').addClass('animated fadeIn')
                    };
                    setTimeout(initElement, 200);


                    function destroyElement() {
                        $('.newbid').removeClass('animated fadeIn')
                        $scope.newBid = false;
                    };

                    setTimeout(destroyElement, 4000);

                } else {
                    if ($('.timer').hasClass('red-text') && $('#time-icon').hasClass('red-text')) {
                        $('.timer').removeClass('red-text');
                        $('#time-icon').removeClass('animated flash infinite red-text');
                    }
                }
            })

            $(document).ready(function() {
                $('.materialboxed').materialbox();
                $('select').material_select();
                setInterval(function() {
                    Materialize.updateTextFields();
                }, 1000)

                $('ul.tabs').tabs();
                $('.tooltipped').tooltip({
                    delay: 50
                });
                var options = [{
                    selector: '#others',
                    offset: 50,
                    callback: function(el) {
                        $('#others').addClass('animated slideInUp')
                    }
                }];

                Materialize.scrollFire(options)
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                // $('.prod-detail').pushpin({
                //     top: $('.prod-detail').offset().top,
                //     offset: 100,
                //     bottom: 530
                // });
            });

            $scope.active = 0;

            $scope.chgSrc = function(img, index) {
                $scope.product.image = img;
                $scope.active = index
            };


        }

    })
})();