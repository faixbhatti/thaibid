/**
 * Created by Afro on 6/19/2017.
 */
'use strict';

angular.module('thai')
    .component('userAuctions', {
        templateUrl: 'app/profile-page/auctions/auctions.html',
        controller: auctionCtrl,
        require: {
            user: '^userProfile'
        }
    });


function auctionCtrl() {
    const ctrl = this;

   ctrl.displayInfo = (info) => {
       ctrl.user.displayInfo(info)
    };

    ctrl.$onInit = function () {
        ctrl.auctions = ctrl.user.auctions;
        $('.tooltipped').tooltip({delay: 50});
    }
}