    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('countdownTimer', {
            templateUrl: 'app/product-detail/countdown-timer/countdown-timer.html',
            controller: timerCtrl,
            require: {
                product: '^productDetail'
            },
            bindings: {
                time: '<',
                bidInfo: '=',
                clear: '='
            },
        });

    function timerCtrl($scope, httpService, $user) {
        var ctrl = this;
        ctrl.user = $user.getUser()

        ctrl.restartTimer = function() {
            ctrl.clear = true;
            // Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
            if (ctrl.product.bidInfo.productSize && ctrl.product.bidInfo.productColor) {
                let bidInfo = {
                    color: ctrl.product.bidInfo.productColor,
                    size: ctrl.product.bidInfo.productSize,
                    productId: ctrl.product.productId,
                    auctionId: ctrl.product.auctionId
                }

                httpService
                    .postUserDetails('product-end-auction', ctrl.user, bidInfo, 'put')
                    .then(data => {
                        let res = httpService.verifyData(data.data);
                        if (res) {
                            Materialize.toast(`${data.data.meta.message}`, 3000)
                        } else {
                            Materialize.toast("An error occured. Please try again", 3000);
                        }
                    })
                    // ctrl.clear = false;
                    // $scope.$broadcast('timer-reset');
                    // $scope.$broadcast('timer-start');
            } else {
                Materialize.toast("Please select product size and color", 2000)
            }
        };

        // $scope.$on('timer-tick', function(event, args) {
        //     if (args.millis <= 10000) {
        //         if (!$('.timer').hasClass('red-text') && !$('#time-icon').hasClass('red-text')) {
        //             $('.timer').addClass('red-text');
        //             $('#time-icon').addClass('animated flash infinite red-text');
        //         }
        //     } else if (args.millis === 20000) {
        //         ctrl.newbid = true;

        //         function initElement() {
        //             ctrl.product.price += 5
        //             $('.newbid').addClass('animated fadeIn')
        //         };
        //         setTimeout(initElement, 200);


        //         function destroyElement() {
        //             $('.newbid').removeClass('animated fadeIn')
        //             ctrl.newbid = false;
        //         };

        //         setTimeout(destroyElement, 4000);

        //     } else {
        //         if ($('.timer').hasClass('red-text') && $('#time-icon').hasClass('red-text')) {
        //             $('.timer').removeClass('red-text');
        //             $('#time-icon').removeClass('animated flash infinite red-text');
        //         }
        //     }
        // })

        ////////////////
        ctrl.$onInit = function() {
            ctrl.timeLeft = ctrl.product.remaining_time
            console.log(ctrl.product)
        }

    }