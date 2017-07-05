/**
 * Created by Afro on 7/5/2017.
 */

angular.module('thai')
    .component('appRedeemShop',{
        templateUrl: 'app/redeem-shop/redeem-shop.html',
        controller: redeemCtrl
    })

function redeemCtrl() {
    const ctrl = this;

    ctrl.$onInit = () => {}
    ctrl.$onDestroy = () => {}
}