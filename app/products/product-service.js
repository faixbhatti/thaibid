/**
 * Created by Afro on 3/23/2017.
 */
'use strict';

angular.module('thai')
    .factory('products', function($http) {
        let products = {
            get: get
        };

        function get() {
            return $http.get('app/products.json');
        }

        return products
    });