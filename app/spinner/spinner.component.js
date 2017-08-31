    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('thaiSpinner', {
            templateUrl: 'app/spinner/spinner.html',
            bindings: {
                position: '<',
                spinnerSize: '<'
            },
        });