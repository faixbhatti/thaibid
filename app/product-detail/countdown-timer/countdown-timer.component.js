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

    function timerCtrl($scope, httpService, $user, $rootScope) {
        var ctrl = this;
        ctrl.user = $user.getUser()
        ctrl.timeLeft = 57;

        ctrl.endAuction = function() {
            ctrl.clear = true;
            // Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
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
                        $rootScope.$broadcast('auction-ended');
                        restartTimer()
                    } else {
                        Materialize.toast("An error occured. Please try again", 3000);
                    }
                })
                // ctrl.clear = false;
        };

        function restartTimer() {
            $scope.$broadcast('timer-reset');
            $scope.$broadcast('timer-start');
        }

        ctrl.autoBid = function() {
            let auctionData = {
                auctionId: ctrl.product.product.auctions.auctionId,
                productId: ctrl.product.product.productId
            };
            httpService
                .postUserDetails('product-auto-bid', ctrl.user, auctionData, 'put')
                .then(res => {
                    let response = httpService.verifyData(res.data);
                    if (response) {
                        // isBidding = false;
                        Materialize.toast('New bid been placed.', 4000);
                        ctrl.product.getAuctionDetails();
                    }
                })
        }

        $scope.$on('timer-tick', function(event, args) {
            if (args.millis <= 10000) {
                if (!$('.timer').hasClass('red-text') && !$('#time-icon').hasClass('red-text')) {
                    $('.timer').addClass('red-text');
                    $('#time-icon').addClass('animated flash infinite red-text');
                    if (ctrl.product.maxBid < ctrl.product.product.minimum_bid) {
                        ctrl.autoBid();
                    }
                }

            } else {
                if ($('.timer').hasClass('red-text') && $('#time-icon').hasClass('red-text')) {
                    $('.timer').removeClass('red-text');
                    $('#time-icon').removeClass('animated flash infinite red-text');
                }
            }
        })

        ctrl.$onInit = function() {
            setTimeout(() => ctrl.timeLeft = ctrl.product.remaining_time, 3000);
        }

    }