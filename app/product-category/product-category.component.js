
/**
 * Created by Afro on 3/29/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');
    
    app.component('category',{
        templateUrl: 'app/product-category/product-category.html',
        controller: function ($routeParams, $scope, products) {
            function get() {
                products.get().then(function (data) {
                    var products = data.data;
                    $scope.products = products
                })
            }
            get()

            $scope.category = $routeParams.category
           

        }
    })

})()