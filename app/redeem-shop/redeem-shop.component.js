/**
 * Created by Afro on 7/5/2017.
 */
'use strict';

angular
    .module('thai')
    .component('appRedeemShop', {
        templateUrl: 'app/redeem-shop/redeem-shop.html',
        controller: redeemCtrl
    });

function redeemCtrl(products, $rootScope) {
    const ctrl = this;
    ctrl.limit = 35;
    ctrl.loading = true;
    ctrl.spinnerPosition = 'fixed';
    $rootScope.previousPage = "/redeem-shop";
    $rootScope.showNav = true;
    $rootScope.inCart = false;
    $rootScope.inDetail = false;

    function get() {
        products
            .get()
            .then(res => {
                ctrl.products = res.data
                    .filter(item => {
                        if (item.is_redeemable) return item
                    })
                ctrl.loading = false;
            })
    }

    get();

    ctrl.$onInit = () => {
    };
    ctrl.$onDestroy = () => {
    }
}