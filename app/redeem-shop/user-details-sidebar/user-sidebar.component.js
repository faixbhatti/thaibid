    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('userSidebar', {
            templateUrl: 'app/redeem-shop/user-details-sidebar/user-sidebar.html',
            controller: userDetsCtrl,
        });

    function userDetsCtrl($rootScope) {
        const ctrl = this;
        ctrl.points = $rootScope.user.points;

        ////////////////

        ctrl.$onInit = function() {};
        ctrl.$onChanges = function(changesObj) {};
        ctrl.$onDestroy = function() {};
    }