(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('about', {
        templateUrl: 'app/about-us/about.html',
        controller: function($rootScope) {
            ctrl.onInit = function() {
                $rootScope.previousPage = '/about'
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0
            };
        }
    });

})();