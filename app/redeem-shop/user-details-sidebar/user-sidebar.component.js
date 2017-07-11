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

    function userDetsCtrl() {
        var ctrl = this;


        ////////////////

        ctrl.$onInit = function() {};
        ctrl.$onChanges = function(changesObj) {};
        ctrl.$onDestroy = function() {};
    }