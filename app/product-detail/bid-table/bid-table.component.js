    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular.module('thai')
        .component('bidTable', {
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