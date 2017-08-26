    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('detailTabs', {
            templateUrl: 'app/product-detail/tabs/tabs.html',
            controller: tabsCtrl,
            bindings: {
                bids: '<',
                product: '<',
                ratings: '='
            },
        });

    function tabsCtrl($rootScope, $scope, Review, $user) {
        var ctrl = this,
            stars;

        ctrl.loggedIn = $user.isAuthenticated();

        $rootScope.$on('loggedIn', checkAuthStatus)
        $rootScope.$on('loggedOut', checkAuthStatus)


        function checkAuthStatus() {
            ctrl.loggedIn = $user.isAuthenticated();
        };

        ctrl.logIn = function() {
            $('#login-modal').modal('open');
        }

        ctrl.addreview = function() {
            var review = {
                "image": "/image/matthew.png",
                "user": $rootScope.username,
                "date": new Date(),
                "text": ctrl.review.text,
            }
            Review.addReview(review, ctrl)
        }

        ctrl.$onInit = () => {
            Review.init();
            $('.tabs').tabs();

            function hideBidsTab() {
                if (ctrl.product.redeemable) {
                    $('.tabs').tabs('select_tab', 'prod-detail')
                }
            }
            hideBidsTab()

        }

    }