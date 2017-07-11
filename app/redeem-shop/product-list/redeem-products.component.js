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
        controller: function($rootScope) {
            const ctrl = this;

            ctrl.addToCart = (item) => {
                $rootScope.cart.push(item);
                Materialize.toast('Item added to cart', 1000)
            }

        }
    });