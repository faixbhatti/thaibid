(function() {
    'use strict';

    var app = angular.module('thai')

    app.directive('placehold', function() {
        return {
            restrict: 'A',
            scope: { placehold: '@' },
            link: function(scope, element, attrs) {
                element.one('load', function() {
                    console.log('Load fired')
                    element.attr('src', scope.placehold);
                });
            }
        };
    });

    app.component('productList', {
        bindings: {
            products: '<',
            columns: '=',
            limit: '<',
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