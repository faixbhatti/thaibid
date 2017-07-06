/**
 * Created by Afro on 7/5/2017.
 */

angular.module('thai')
    .component('appRedeemShop',{
        templateUrl: 'app/redeem-shop/redeem-shop.html',
        controller: redeemCtrl
    });

function redeemCtrl(products) {
    const ctrl = this;
    ctrl.limit = 35;
    ctrl.background = '/image/slideshow/redeem.jpg';

    function get() {
        products
            .get()
            .then(res => {
                ctrl.products = res.data
            })
    }
    get();
    ctrl.$onInit = () => {};
    ctrl.$onDestroy = () => {}
}