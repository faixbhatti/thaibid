(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai')

    app.component('invoiceModal', {
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
})();