(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('privacy', {
        templateUrl: 'app/privacy-policy/privacy.html',
        controller: function() {
            ctrl.onInit = function() {
                $rootScope.previousPage = "/privacy";
                $rootScope.inCart = false;
                $rootScope.inDetail = false;


                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0
            };
        }
    });

})();