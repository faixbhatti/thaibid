    'use strict';

    angular
        .module('thai')
        .component('sideCart', {
            templateUrl: 'app/side-cart/side-cart.html',
            controller: cartCtrl,
            bindings: {
                itemsInCart: '<',
            },
        });

    function cartCtrl($scope, deleteModal, $location, $rootScope) {
        const $ctrl = this;
        $scope.hasDeleted = $rootScope.hasDeleted;

        $scope.$watch('$root.cart', function(newValue, oldValue, scope) {
            $ctrl.itemsInCart = newValue;
        }, true);

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        };

        $scope.checkout = function() {
            $location.url('/checkout')
        };

        $rootScope.$watch('hasDeleted', function(newValue, oldValue, scope) {
            $scope.hasDeleted = newValue;
        }, true);

        ////////////////

        $ctrl.$onInit = function() {
            $('.cart-button').sideNav({
                menuWidth: 300, // Default is 300
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: false // Choose whether you can drag to open on touch screens
            });

            $ctrl.getTotal = function() {
                let total = 0;
                $ctrl.itemsInCart.forEach(item => total += item.price)
                return total
            }
        };
    }