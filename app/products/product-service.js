/**
 * Created by Afro on 3/23/2017.
 */
(function(){
    'use strict';

    var app = angular.module('thai');

    app.factory('products',function($http){
        var products = {
            get: get
        };

        function get() {
            return $http.get('app/products.json')
        }

        return products
    })
})()