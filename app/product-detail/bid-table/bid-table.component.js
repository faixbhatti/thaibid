(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('bidTable', {
        templateUrl: 'app/product-detail/bid-table/bid-table.html',
        controller: bidTableCtrl,
        bindings: {
            bids: '<',
        },
    });

    function bidTableCtrl() {
        var ctrl = this;


        ////////////////

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();