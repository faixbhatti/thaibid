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
        var ctrl = this;
        let stars;
        ctrl.spinnerPosition = "absolute";
        ctrl.loading = false;

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
                "product_id": ctrl.product.productId,
                "comments": ctrl.review.text,
            }
            Review.addReview(review, ctrl)
        }

        ctrl.$onInit = function() {
            $('.tabs').tabs();

            // function hideBidsTab() {
            //     if (ctrl.product.redeemable) {
            //         $('.tabs').tabs('select_tab', 'prod-detail')
            //     }
            // }
            // hideBidsTab()

        }

    }