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


    ctrl.selected = [];

    ctrl.query = {
        'order': 'name',
        limit: 10,
        page: 1,
        filter: ''
    }

    // function get(abUrl, userInfo, page) {
    //     ctrl.promise = httpService
    //         .getUserDetails(abUrl, userInfo, page)
    //         .then(res => {
    //             let fectched = res.data;
    //             if (fectched.meta.message === "Fetched Successfully") {
    //                 if (fectched.data) {
    //                     let metaData = fectched.data;
    //                     ctrl.orders = metaData.data;
    //                     ctrl.query.total = metaData.total;
    //                     ctrl.query.page = metaData.current_page;
    //                 }
    //             }
    //         })
    // }
    // get('order', ctrl.user)

    ctrl.$onInit = function() {
        ctrl.auctions = ctrl.user.auctions;
        $('.tooltipped').tooltip({ delay: 50 });
        $('.tabs').tabs()
    }
}