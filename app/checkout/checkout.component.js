    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular.module('thai')
        .component('checkout', {
            templateUrl: 'app/checkout/checkout.html',
            controller: checkCtrl,
        });


    function checkCtrl($scope, $rootScope, $http, $location, Location, Calculate, deleteModal) {
        $rootScope.showNav = false;
        $rootScope.inCart = true;
        $rootScope.inDetail = false;

        $scope.items = $rootScope.cart;
        $scope.discounted = false;
        $scope.selectedStep = 0;
        $scope.items.forEach(item => item.quantity = 1)
        $scope.all = true;
        $scope.billing = {};
        $scope.checkingOut = false;

        $scope.templates = {
            billing: 'app/checkout/billing.html',
            deliveryOptions: 'app/checkout/delivery.html',
            order: 'app/checkout/order.html'
        }

        $scope.stepData = [
            { step: 1, completed: false, optional: false, data: {} },
            { step: 2, completed: false, optional: false, data: {} },
            { step: 3, completed: false, optional: false, data: {} },
        ]

        $scope.completeStep = function(stepData) {
            console.log(JSON.stringify(stepData));
            stepData.completed = true;
            $scope.nextStep();
        }

        // Proceed to next step of payment
        $scope.nextStep = function() {
            if ($scope.selectedStep < 3) $scope.selectedStep += 1

            // Scroll document back to top anytime step is changed
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        $scope.previousStep = function() {
            if ($scope.selectedStep > 1) $scope.selectedStep -= 1

            // Scroll document back to top anytime step is changed
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        $scope.checkout = function() {
            $scope.checkingOut = !$scope.checkingOut;
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
            $scope.paymentOption = $scope.paymentOption === option ? option : '';
        }

        $scope.getDistrict = function(province) {
            Location.getDistricts(province)
        }

        $scope.getSubDistrict = function(district) {
            Location.getSubDistricts(district)
        }

        $scope.getDiscount = function(couponCode) {
            if (couponCode === $rootScope.username) {
                Materialize.toast("You've received a 10% discount", 1000);
                $scope.discounted = true;
            } else {
                Materialize.toast("Sorry that coupon code doesn't exist.", 1000);
            }
        }

        $scope.removeFromCart = function(index, items) {
            deleteModal.open(index, items)
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
            Calculate.increment(item, $scope, $scope.items)
        }

        $scope.decrement = function(item) {
            Calculate.decrement(item, $scope, $scope.items)
        }

        $(document).ready(function() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            $('.back-up').hide()
        })

    }