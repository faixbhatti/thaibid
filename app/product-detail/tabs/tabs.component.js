(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('detailTabs', {
        templateUrl: 'app/product-detail/tabs/tabs.html',
        controller: tabsCtrl,
        bindings: {
            bids: '<',
        },
    });

    function tabsCtrl() {
        var ctrl = this;


        ////////////////

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();