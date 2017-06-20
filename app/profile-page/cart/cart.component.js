/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userCart', {
        templateUrl: 'app/profile-page/cart/cart.html',
        controller: userCartCtrl,
        require: {
            user: '^userProfile'
        }
    });


function userCartCtrl($rootScope, $location){
    const ctrl = this;

    ctrl.checkout = function () {
        $rootScope.cart = ctrl.cart;
        $location.url('/checkout');
    };


    ctrl.$onInit = () => {
        ctrl.cart = ctrl.user.auctions;
    }
};