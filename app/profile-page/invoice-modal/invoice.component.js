    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular.module('thai')
        .component('invoiceModal', {
            templateUrl: 'app/profile-page/invoice-modal/invoice-modal.html',
            controller: invoiceCtrl,
            bindings: {
                item: '=',
            },
        });

    function invoiceCtrl() {
        var ctrl = this;

        $(document).ready(function() {
            $('.modal').modal()
        })

    }