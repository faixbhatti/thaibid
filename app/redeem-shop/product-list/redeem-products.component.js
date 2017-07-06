/**
 * Created by Afro on 7/6/2017.
 */
    'use strict';

    angular.module('thai')
        .component('appRedeemProducts', {
            bindings: {
                products: '<',
                limit: '<',
            },
            templateUrl: 'app/redeem-shop/product-list/redeem-products.html',
            controller: function() {
                const ctrl = this;

            }
        });