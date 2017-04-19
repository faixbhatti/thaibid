/**
 * Created by Afro on 3/29/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('category', {
        templateUrl: 'app/product-category/product-category.html',
        controller: function($routeParams, $scope, products) {
            function get() {
                products.get().then(function(data) {
                    var products = data.data;
                    $scope.products = products
                    $scope.limit = products.length
                })
            }
            get()



            $scope.category = $routeParams.category



            $(document).ready(function() {
                $('.tooltipped').tooltip({
                    delay: 50
                })

                var slider = document.getElementById('uiSlider');
                noUiSlider.create(slider, {
                    start: [20, 300],
                    connect: true,
                    step: 10,
                    range: {
                        'min': 10,
                        'max': 1000
                    }
                });

                slider.noUiSlider.on('update', function(values, handle) {
                    if (handle === 1) {
                        $scope.left = values[handle]
                    } else {
                        $scope.right = values[handle]
                    }
                });

                var options = [$scope.left, $scope.right]



            })

        }
    })

})()