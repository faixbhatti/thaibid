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


    function checkCtrl($scope, $rootScope) {

        $scope.items = $rootScope.cart;

        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].quantity = 1
        }

        $rootScope.showNav = false;

        $scope.all = true;

        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.items.length; i++) {
                total += $scope.items[i].price
            }
            return total
        }


        $scope.previousPage = $rootScope.previousPage;

        $scope.increment = function(item) {
            item.quantity++
        };

        $scope.decrement = function(item) {
            item.quantity--
        };


        ////////////////

    }
})();