(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('guarantees', {
        templateUrl: 'app/assurances/assurance.html',
        bindings: {
            show: '<'
        }
    });
})();