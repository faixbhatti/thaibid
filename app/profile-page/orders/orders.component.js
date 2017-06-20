/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userOrders', {
        require: {
           user: '^userProfile'
        },
       templateUrl: 'app/profile-page/orders/orders.html',
        controller: orderCtrl,

    });


function orderCtrl() {
    const ctrl = this;

    ctrl.showInvoice = (invoice) => {
        ctrl.user.showInvoice(invoice);
    };

    ctrl.$onInit = () => {
        ctrl.orders = ctrl.user.orders;
    }
};