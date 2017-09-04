    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('countdownTimer', {
            templateUrl: 'app/product-detail/countdown-timer/countdown-timer.html',
            controller: timerCtrl,
            bindings: {
                time: '<',
                bidInfo: '=',
                product: '<',
                clear: '='
            },
        });

    function timerCtrl($scope, httpService, $user) {
        var ctrl = this;
        ctrl.user = $user.getUser()

        ctrl.restartTimer = function() {
            ctrl.clear = true;
            // Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
            if(ctrl.bidInfo.productSize && ctrl.bidInfo.productColor){
                let bidInfo = {}
                bidInfo.color = ctrl.bidInfo.productColor;
                bidInfo.size = ctrl.bidInfo.productSize;
                bidInfo.productId = ctrl.product.productId;
                bidInfo.auctionId = ctrl.product.auctions.auctionId;
            httpService
                .postUserDetails('product-end-auction',ctrl.user, bidInfo, 'put')
                .then(data => {
                    let res = data.data
                    console.log(res.data)
                    Materialize.toast('Auction ended', 2000)
                }, () => {
                    Materialize.toast("An error occured. Please try again", 3000);
                })
                // ctrl.clear = false;
                // $scope.$broadcast('timer-reset');
                // $scope.$broadcast('timer-start');
            }
            else{
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

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }