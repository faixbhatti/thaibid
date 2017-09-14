/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userRewards', {
        require: {
            user: '^userProfile'
        },
        templateUrl: 'app/profile-page/rewards/rewards.html',
        controller: rewardCtrl
    });

function rewardCtrl(httpService, $user) {

    const ctrl = this;
    ctrl.totalPoints = 0;
    ctrl.user = $user.getUser();

    ctrl.selected = [];

    function get(abUrl, userInfo, page) {
        ctrl.promise = httpService
            .getUserDetails(abUrl, userInfo, page)
            .then(res => {
                let data = httpService.verifyData(res.data)
                if (data) {
                    console.log(data)
                    let meta = data.data;
                    console.log(meta)
                    window.orders = meta;
                    ctrl.orders = meta.filter(order => order.order.status === 'delivered')
                    console.log(ctrl.orders)
                    ctrl.orders.forEach(reward => {
                            ctrl.totalPoints += reward.product.pm_cashback_point
                        })
                        // ctrl.query.total = metaData.total;
                        // ctrl.query.page = metaData.current_page;
                }
            })
    }

    get('order', ctrl.user);

    ctrl.query = {
        'order': 'name',
        limit: 10,
        page: 1,
        filter: ''
    }

    ctrl.$onInit = () => {

    }
};