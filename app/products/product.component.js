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
            const ctrl = this;

            ctrl.restartTimer = function() {
                $scope.$broadcast('timer-reset');
                $scope.$broadcast('timer-start');
            };

            ctrl.viewProduct = (index) => {
                $location.url(`/product/${index}`)
            };

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
            });

            ctrl.$onInit = function() {
                // ctrl.products.forEach(product => {
                //     $scope.$on(`timer-reset-${product.pm_id}`)
                // })
            }
        }
    })
    .directive('lazyLoad', function() {
        return {
            restrict: 'A',
            scope: { placehold: '@' },
            link: function(scope, element, attrs) {
                let observer = new IntersectionObserver(onChange);
                let prodCard = angular.element(element)[0];
                observer.observe(prodCard);

                function onChange(changes) {
                    changes.forEach(change => {
                        change.target.src = scope.placehold;
                        observer.unobserve(change.target);

                        // thank you, we don't need you anymore
                        observer.disconnect();
                    })
                }
            }
        };
    })