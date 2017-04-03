/**
 * Created by Afro on 3/23/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');

    app.component('productDetail', {
        templateUrl: 'app/product-detail/product-detail.html',
        controller: function ($scope, $routeParams, products) {
            function get() {
                products.get().then(function (data) {
                    var products = data.data;
                    $scope.similarProducts = products.slice(0, 6)
                    $scope.product = products[$routeParams.productId - 1]
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

            $scope.restartTimer = function () {
                Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
                setTimeout(function () {
                    $scope.$broadcast('timer-reset');
                    $scope.$broadcast('timer-start');
                }, 6000)
            };

            $scope.$on('timer-tick', function (event, args) {
                if (args.millis <= 10000) {
                    if (!$('.timer').hasClass('red-text') && !$('#time-icon').hasClass('red-text')) {
                        $('.timer').addClass('red-text');
                        $('#time-icon').addClass('animated flash infinite red-text');
                    }
                }
                
                else if (args.millis === 20000){
                	 var $toastContent = $('<span>New bid on the product! New price ฿89</span>');
                	 Materialize.toast($toastContent, 3000, 'red');
                }
                else {
                    if ($('.timer').hasClass('red-text') && $('#time-icon').hasClass('red-text')) {
                        $('.timer').removeClass('red-text');
                        $('#time-icon').removeClass('animated flash infinite red-text');
                    }
                }
            })

            $(document).ready(function () {
                $('.materialboxed').materialbox();
                $('select').material_select();
                Materialize.updateTextFields();
                $('ul.tabs').tabs();
                $('.tooltipped').tooltip({delay: 50});
                var options = [{
                    selector: '#others', offset: 50, callback: function (el) {
                        $('#others').addClass('animated slideInUp')
                    }
                }];

                Materialize.scrollFire(options)
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });

            $scope.active = 0;

            $scope.chgSrc = function (img, index) {
                $scope.product.image = img;
                $scope.active = index
            };


        }

    })
})();