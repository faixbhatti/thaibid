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

const rewardCtrl = () => {
    const ctrl = this;

    ctrl.selected = [];

    ctrl.query = {
        'order': 'name',
        limit: 10,
        page: 1,
        filter: ''
    }

    ctrl.$onInit = () => {
        ctrl.rewards = ctrl.user.rewards;
        console.log(ctrl.rewards)
            // ctrl.rewards.forEach((reward) => {
            //     ctrl.totalPoints += reward.rewards
            // });
    }
};