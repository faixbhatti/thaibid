(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('termsConditions', {
        templateUrl: 'app/terms-and-conditions/terms.html',
        controller: function($rootScope) {
            ctrl.onInit = function() {
                $rootScope.previousPage = '/terms';
                $rootScope.inCart = false;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0
                $rootScope.inDetail = false;
            };
        }
    });

})();