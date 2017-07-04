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

        const ctrl = this;
        ctrl.selectedStep = 0;


        $scope.items = $rootScope.cart;
        $scope.discounted = false;
        $scope.items.forEach(item => item.quantity = 1)
        $scope.all = true;
        $scope.billing = {};
        $scope.checkingOut = false;
        $scope.useCash = false;
        $scope.useAtm = false;
        $scope.usePoints = false;
        $scope.useCard = false;
        $scope.templates = {
            billing: 'app/checkout/billing.html',
            deliveryOptions: 'app/checkout/delivery.html',
            order: 'app/checkout/order.html'
        }

        ctrl.stepData = [
            { step: 1, completed: false, optional: false, data: {} },
            { step: 2, completed: false, optional: false, data: {} },
            { step: 3, completed: false, optional: false, data: {} },
        ]

        $scope.completeStep = function(stepData) {
            stepData.completed = true;
            console.log(JSON.stringify(stepData));
            $scope.nextStep();
        }

        // Proceed to next step of payment
        $scope.nextStep = function() {
            if (ctrl.selectedStep < 3) {
                ctrl.selectedStep += 1
                console.log(ctrl.selectedStep)

                // Scroll document back to top anytime step is changed
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }

        $scope.previousStep = function() {
            if (ctrl.selectedStep > 0) {
                ctrl.selectedStep -= 1

                // Scroll document back to top anytime step is changed
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }

        $scope.checkout = function() {
            $scope.checkingOut = !$scope.checkingOut;
            Location.getProvinces()
        }

        // Return to cart if in payment page
        $scope.goBack = function() {
            if ($scope.checkingOut === true) {
                $scope.checkingOut = false;
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
            switch (option) {
                case 'card':
                    $scope.useCash = false;
                    $scope.useAtm = false;
                    $scope.usePoints = false;
                    $scope.useCard = !$scope.useCard;
                    break;
                case 'atm':
                    $scope.useCash = false;
                    $scope.usePoints = false;
                    $scope.useCard = false;
                    $scope.useAtm = !$scope.useAtm;
                    break;
                case 'cash':
                    $scope.useAtm = false;
                    $scope.usePoints = false;
                    $scope.useCard = false;
                    $scope.useCash = !$scope.useCash;
                    break;
                case 'points':
                    $scope.useCash = false;
                    $scope.useAtm = false;
                    $scope.useCard = false;
                    $scope.usePoints = !$scope.usePoints
                    break;

                default:
                    $scope.useCash = false;
                    $scope.useAtm = false;
                    $scope.usePoints = false;
                    $scope.useCard = false;
                    break;
            }
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