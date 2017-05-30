    'use strict';

    // Usage: Creates modal to display purchases and auctions
    // 
    // Creates: a modal
    // 

    angular.module('thai')
        .component('purchaseModal', {
            templateUrl: 'app/profile-page/modal/purchase-modal.html',
            controller: modalCtrl,
            bindings: {
                info: '=',
            },
        });

    function modalCtrl() {
        var ctrl = this;


        ////////////////

        ctrl.onInit = function() {
            console.log(ctrl.info)
            $('ul.tabs').tabs()

        };
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};

        $(document).ready(function() {
            $('ul.tabs').tabs()
        })
    }