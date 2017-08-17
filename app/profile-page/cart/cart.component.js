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


function userCartCtrl($rootScope, $location, $user, httpService) {
    const ctrl = this;
    ctrl.user = $user.getUser();

    ctrl.checkout = function() {
        $rootScope.cart = ctrl.cart;
        $location.url('/checkout');
    };

    function get(abUrl, userInfo, page) {
        httpService
            .getUserDetails(abUrl, userInfo, page)
            .then(res => {
                let fectched = res.data;
                if (fectched.meta.message === "Cart Details Fetch Successfully.") {
                    if (fectched.data) {
                        ctrl.cart = fectched.data;
                    }
                }
            })
    }
    get('cart', ctrl.user)

    ctrl.$onInit = () => {}
};