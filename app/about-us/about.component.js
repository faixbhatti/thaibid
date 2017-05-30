'use strict';

// Usage:
// 
// Creates:
// 

angular.module('thai')
    .component('about', {
        templateUrl: 'app/about-us/about.html',
        controller: function($rootScope) {
            ctrl.onInit = function() {
                $rootScope.previousPage = '/about'
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0
                $rootScope.inDetail = false;
            };
        }
    });