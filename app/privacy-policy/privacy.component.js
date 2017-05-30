    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('privacy', {
            templateUrl: 'app/privacy-policy/privacy.html',
            controller: function() {
                ctrl.onInit = function() {
                    $rootScope.previousPage = "/privacy";
                    $rootScope.inCart = false;
                    $rootScope.inDetail = false;
                    $rootScope.showNav = true;


                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0
                };
            }
        });