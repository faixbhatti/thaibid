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


function auctionCtrl(httpService, $user) {
    const ctrl = this;
    if ($user.getUser()) {
        ctrl.user = $user.getUser();
    }

    ctrl.displayInfo = (info) => {
        ctrl.user.displayInfo(info);
    };


    ctrl.selected = [];

    ctrl.query = {
        'order': 'name',
        limit: 10,
        page: 1,
        filter: ''
    };

    // function get(abUrl, userInfo, data, command) {
    //     return
    // }

    ctrl.getAuctions = function(data) {
        httpService
            .postUserDetails('auction', ctrl.user, data, 'post')
            .then(res => {
                let data = httpService.verifyData(res.data);
                if (data) {
                    let metaData = data;
                    ctrl.query.total = metaData.total;
                    ctrl.query.page = metaData.current_page;
                }
            })
    };

    ctrl.getAuctions({ action: 'ACTIVE', paginate: 5 });

    ctrl.$onInit = function() {
        $('.tooltipped').tooltip({ delay: 50 });
        $('.tabs').tabs()
    }
}