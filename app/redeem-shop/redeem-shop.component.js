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

function redeemCtrl(products, $rootScope, $http, httpService) {
    const ctrl = this;
    ctrl.limit = 35;
    ctrl.loading = true;
    ctrl.spinnerPosition = 'absolute';
    $rootScope.previousPage = "/redeem-shop";
    $rootScope.showNav = true;
    $rootScope.inCart = false;
    $rootScope.inDetail = false;
    ctrl.loggedIn = $rootScope.loggedIn;

    function get() {
        // products
        //     .get()
        //     .then(res => {
        //         ctrl.products = res.data
        //             .filter(item => {
        //                 if (item.is_redeemable) return item
        //             });
        //     });
        httpService
            .get('category/redeem-shop')
            .then((res) => {
                let data = res.data.data;
                ctrl.products = data.data;
                console.log(ctrl.products)
                ctrl.loading = false;

            }, (err) => {
                console.log(err.message);
            })


    }

    get();

    ctrl.$onInit = () => {};
    ctrl.$onDestroy = () => {}
}