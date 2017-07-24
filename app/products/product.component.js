    'use strict';

    angular.module('thai')
        .component('productList', {
            bindings: {
                products: '<',
                columns: '=',
                limit: '<',
            },
            templateUrl: 'app/products/product-list.html',
            controller: function($scope, $location) {
                var ctrl = this

                ctrl.time = 30;

                ctrl.restartTimer = function() {
                    $scope.$broadcast('timer-reset');
                    $scope.$broadcast('timer-start');
                };

                ctrl.viewProduct = (index) => {
                    $location.url(`/product/${index}`)
                }

                $scope.$on('timer-tick', function(event, args) {
                    if (args.millis <= 10000) {
                        if (!$('.prod-timer').hasClass('red-text')) {
                            $('.prod-timer').addClass('red-text');
                        }
                        if ($('.timer-icon').hasClass('hide')) {
                            $('.timer-icon').removeClass('hide');
                        }
                    } else {
                        if ($('.prod-timer').hasClass('red-text')) {
                            $('.prod-timer').removeClass('red-text');
                        }

                        if (!$('.timer-icon').hasClass('hide')) {
                            $('.timer-icon').addClass('hide');
                        }
                    }
                })
            }
        })
        .directive('placehold', function() {
            return {
                restrict: 'A',
                scope: { placehold: '@' },
                link: function(scope, element, attrs) {
                    element.one('load', function() {
                        element.attr('src', scope.placehold);
                    });
                }
            };
        })