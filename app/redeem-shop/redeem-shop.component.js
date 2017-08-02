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

function redeemCtrl(products, $rootScope, httpService) {
    const ctrl = this;
    ctrl.limit = 35;
    ctrl.loading = true;
    ctrl.spinnerPosition = 'fixed';
    $rootScope.previousPage = "/redeem-shop";
    $rootScope.showNav = true;
    $rootScope.inCart = false;
    $rootScope.inDetail = false;
    ctrl.loggedIn = $rootScope.loggedIn;

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
            // httpService
            //     .get('category/redeem-shop')
            //     .then((res) => {
            //         console.log(JSON.stringify(res))
            //     }, (err) => {
            //         console.log(err.message)
            //     })
    }

    get();

    ctrl.$onInit = () => {};
    ctrl.$onDestroy = () => {}
}