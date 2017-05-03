(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('countdownTimer', {
        templateUrl: 'app/product-detail/countdown-timer/countdown-timer.html',
        controller: timerCtrl,
        bindings: {
            time: '<',
            newbid: '=',
            product: '<',
            clear: '='
        },
    });

    function timerCtrl($scope) {
        var ctrl = this;

        ctrl.restartTimer = function() {
            ctrl.clear = true;
            // Materialize.toast('Auction has ended. Check your inbox to confirm if you won the auction', 5000, 'rounded')
            setTimeout(function() {
                $('.timeout').addClass('animated fadeIn')
            }, 200)

            setTimeout(function() {
                $('.timeout')
                    .addClass('fadeOut')
                    .removeClass('animated fadeIn fadeOut')

                ctrl.clear = false;
                $scope.$broadcast('timer-reset');
                $scope.$broadcast('timer-start');

            }, 6000)
        };

        $scope.$on('timer-tick', function(event, args) {
            if (args.millis <= 10000) {
                if (!$('.timer').hasClass('red-text') && !$('#time-icon').hasClass('red-text')) {
                    $('.timer').addClass('red-text');
                    $('#time-icon').addClass('animated flash infinite red-text');
                }
            } else if (args.millis === 20000) {
                ctrl.newbid = true;

                function initElement() {
                    ctrl.product.price += 5
                    $('.newbid').addClass('animated fadeIn')
                };
                setTimeout(initElement, 200);


                function destroyElement() {
                    $('.newbid').removeClass('animated fadeIn')
                    ctrl.newbid = false;
                };

                setTimeout(destroyElement, 4000);

            } else {
                if ($('.timer').hasClass('red-text') && $('#time-icon').hasClass('red-text')) {
                    $('.timer').removeClass('red-text');
                    $('#time-icon').removeClass('animated flash infinite red-text');
                }
            }
        })

        ////////////////

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();