(function() {
    'use strict';

    angular
        .module('thai')
        .controller('indexCtrl', indexCtrl);

    function indexCtrl($scope, $location, $rootScope, deleteModal) {
        const ctrl = this;


        $scope.showNav = $rootScope.showNav;
        $scope.cart = $rootScope.cart;
        $scope.loggedIn = $rootScope.loggedIn;
        $scope.username = $rootScope.user.username;
        $scope.inMobile = $rootScope.inMobile.matches;
        $scope.shopRedeem = $rootScope.shopRedeem;
        $scope.search = $rootScope.searching;
        const mql = $rootScope.inMobile;


        let group = [
            "$root.showNav",
            "$root.loggedIn",
            "$root.user.username",
            "$root.shopRedeem",
            "$root.searching"
        ];

        $scope.$watchGroup(group, function(newValue, oldValue, scope) {
            [$scope.showNav,
                $scope.loggedIn,
                $scope.username,
                $scope.shopRedeem,
                $scope.search
            ] = newValue;
        }, true);

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true);

        $scope.location = function(url) {
            if (url === '/redeem-shop') {
                $location.url(`${url}`)
            } else {
                $location.url(`/category${url}`)
            }
        };

        function initComponents() {
            $('.tooltipped').tooltip()

            $(".dropdown-button").dropdown({
                inDuration: 300,
                outDuration: 225,
            });
        }

        $scope.checkout = function() {
            $location.url('/checkout')
        };

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        };


        $scope.logout = function() {
            $rootScope.loggedIn = false;
            $rootScope.user = {};
            $rootScope.cart = [];
            Materialize.toast("You've successfully logged out", 1000)
        };


        ctrl.searching = function() {
            if (!$scope.search) {
                setTimeout(function() {
                    $('#search').focus()
                }, 200)
            }
            $rootScope.searching = !$rootScope.searching
            setTimeout(() => initComponents(), 200);
        };


        $scope.addToScreen = function() {
            let homeModal = $("#homescreen-modal");
            homeModal.css("opacity", 0);
            homeModal.modal('open');
            const backdrop = document.querySelector('.modal-overlay');
            backdrop.style.background = "#26848c";
            backdrop.style.opacity = 0.8;
            homeModal.css("opacity", 1);
        };

        function showMobile(e) {
            $scope.inMobile = e.matches;
        }

        mql.addListener(showMobile);
    }
})();