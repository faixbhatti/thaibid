(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('checkout', {
        templateUrl: 'app/checkout/checkout.html',
        controller: checkCtrl,
    });


    function checkCtrl($scope, $rootScope, $http, $location, Location, Calculate) {

        $scope.items = $rootScope.cart;
        $rootScope.inCart = true;


        $scope.items.forEach(item => item.quantity = 1)

        $rootScope.showNav = false;

        $scope.all = true;

        $scope.billing = {}

        $scope.templates = [
            'app/checkout/billing.html',
            'app/checkout/delivery.html',
            'app/checkout/order.html'
        ]

        $scope.step = 0;

        $scope.oneFinished = false;
        $scope.twoFinished = false;

        // Proceed to next step of payment
        $scope.stepTo = function(step) {
            $scope.step = step
            if (step === 1) $scope.oneFinished = true;
            if (step === 2) $scope.twoFinished = true;

            $scope.template = $scope.templates[step]

            // Scroll document back to top anytime step is changed
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        $scope.checkout = function() {
            $scope.nextStep = true;
            Location.getProvinces()
        }

        // Return to cart if in payment page
        $scope.goBack = function() {
            if ($scope.nextStep === true) {
                $scope.nextStep = false;
                return;
            }
            $location.url($scope.previousPage)
        }

        // List of payment icons
        $scope.imgs = [
            'Icons/2co.png',
            'Icons/paypal.png',
            'Icons/moneygram.png',
            'Icons/mastercard.png',
            'Icons/visa.png',
        ]

        // Select required payment option
        $scope.selectPayment = function(option) {
            $scope.paymentOption = option
        }

        $scope.getDistrict = function(province) {
            Location.getDistricts(province)
        }

        $scope.getSubDistrict = function(district) {
            Location.getSubDistricts(district)
        }

        $scope.finish = function() {
            $rootScope.template = 'orders';
            var url = `user/${$rootScope.username}`
            $location.url(url)
        }

        $scope.template = $scope.templates[0]

        // Get total amount of all items in cart
        $scope.total = Calculate.getTotal($scope.items)


        $scope.previousPage = $rootScope.previousPage;

        $scope.increment = function(item) {
            Calculate.increment(item)
        }

        $scope.decrement = function(item) {
            Calculate.decrement(item)
        }


        $(document).ready(function() {

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        })

    }
})();