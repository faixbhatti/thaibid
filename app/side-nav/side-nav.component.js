(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('sideNav', {
            templateUrl: 'app/side-nav/side-nav.html',
            controller: sideCtrl,
            bindings: {
                username: '<',
                loggedIn: '<'
            },
        });

    function sideCtrl($scope, $rootScope, $location) {
        const $ctrl = this;

        let group = [
            "$root.loggedIn",
            "$root.username"
        ];

        $scope.$watchGroup(group, function(newValue, oldValue, scope) {
            [
                $ctrl.loggedIn,
                $ctrl.username
            ] = newValue;
        }, true);

        $scope.location = function(url) {
            if (url === '/redeem-shop') $location.url(url)
            else $location.url('/category' + url)
        };

        $ctrl.signout = function() {
            $rootScope.loggedIn = false;
            $rootScope.username = "";
            $rootScope.cart = [];
            Materialize.toast("You've successfully logged out", 1000)
        };


        ////////////////

        $ctrl.$onInit = function() {
            $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 300
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens 
            });
            $('.collapsible.collapsible-accordion').collapsible();
            $('.show-login').on('click', function() {
                $('#login-modal').modal('open')
            })
        };
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();