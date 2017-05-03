(function() {
    'use strict';

    var app = angular.module('thai')

    app.component('productList', {
        bindings: {
            products: '<',
            columns: '=',
            limit: '<'
        },
        templateUrl: 'app/products/product-list.html',
        controller: function($scope) {
            var ctrl = this

            ctrl.time = 30;

            ctrl.restartTimer = function() {
                $scope.$broadcast('timer-reset');
                $scope.$broadcast('timer-start');
            };

        }
    })
})()