    'use strict';

    // Usage:0
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('sideCart', {
            templateUrl: 'app/side-cart/side-cart.html',
            controller: cartCtrl,
            bindings: {
                itemsInCart: '<',
            },
        });

    function cartCtrl($scope, deleteModal, $location) {
        var $ctrl = this;

        var group = [
            "$root.cart"
        ]

        $scope.$watch('$root.cart', function(newValue, oldValue, scope) {
            $ctrl.itemsInCart = newValue;
        }, true)


        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        }

        $scope.checkout = function() {
            $location.url('/checkout')
        }

        ////////////////

        $ctrl.$onInit = function() {
            $('.cart-button').sideNav({
                menuWidth: 300, // Default is 300
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens
            })

            $ctrl.getTotal = function() {
                var total = 0;
                $ctrl.itemsInCart.forEach(item => total += item.price)
                return total
            }
        };
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }