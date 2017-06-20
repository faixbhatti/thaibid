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
        const ctrl = this;

        ctrl.$onInit = () => {
            $('.modal').modal()
        }

    }