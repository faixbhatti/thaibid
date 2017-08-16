(function() {
    'use strict';

    angular
        .module('thai')
        .controller('indexCtrl', indexCtrl);

    function indexCtrl($scope, $location, $rootScope, deleteModal, $user, httpService) {
        const ctrl = this;

        $scope.showNav = $rootScope.showNav;
        $scope.cart = $rootScope.cart;
        $scope.loggedIn = $user.isAuthenticated();
        $scope.inMobile = $rootScope.inMobile.matches;
        $scope.shopRedeem = $rootScope.shopRedeem;
        $scope.search = $rootScope.searching;
        const mql = $rootScope.inMobile;
        $scope.hasDeleted = $rootScope.hasDeleted;
        $scope.loaded = false;

        if ($user.isAuthenticated()) {
            $scope.user = $user.getUser();
            $scope.loaded = true;
        }

        let group = [
            "$root.showNav",
            "$root.shopRedeem",
            "$root.searching"
        ];

        $scope.$watchGroup(group, function(newValue, oldValue, scope) {
            [$scope.showNav,
                $scope.shopRedeem,
                $scope.search
            ] = newValue;
            initComponents();
        }, true);

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true);

        $rootScope.$watch('hasDeleted', function(newValue, oldValue, scope) {
            $scope.hasDeleted = newValue;
        }, true);

        $rootScope.$on('loggedIn', checkAuthStatus)
        $rootScope.$on('loggedOut', checkAuthStatus)

        $scope.location = function(url) {
            if (url === 'redeem-shop') {
                $location.url(`/${url}`)
            } else {
                $location.url(`/category/${url}`)
            }
        };


        function checkAuthStatus() {
            $scope.loggedIn = $user.isAuthenticated();
            $scope.user = $user.getUser();
        };

        (function get() {
            httpService
                .get('category')
                .then(res => {
                    console.log(res.data)
                    if (res.data.meta.message === "Fetched Successfully") {
                        $scope.categories = res.data.data
                    }
                })
        })()

        $scope.scrollLeft = () => {
            let menuBar = document.querySelector('.mob-menu');
            let leftScroller = document.querySelector('.menu-scroller.left-side'),
                width = menuBar.scrollWidth;
            if (width > menuBar.scrollLeft) {
                if (leftScroller.classList.contains('disabled')) {
                    leftScroller.classList.remove('disabled')
                    leftScroller.classList.add('z-depth-2')
                }
                menuBar.scrollLeft -= 20;
            } else {
                leftScroller.classList.add('disabled')
                leftScroller.classList.remove('z-depth-2');
            }
        }

        $scope.scrollRight = () => {
            let menuBar = document.querySelector('.mob-menu');
            let rightScroller = document.querySelector('.menu-scroller.right-side'),
                width = menuBar.scrollWidth;
            if (menuBar.scrollLeft < width) {
                if (rightScroller.classList.contains('disabled')) {
                    rightScroller.classList.remove('disabled')
                    leftScroller.classList.add('z-depth-2');
                }
                menuBar.scrollLeft += 20;
            } else {
                rightScroller.classList.add('disabled')
                leftScroller.classList.remove('z-depth-2');
            }
        }

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
            $user.unauthenticate();
            $rootScope.$broadcast('loggedOut');
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

        $(".dropdown-button").dropdown({
            inDuration: 300,
            outDuration: 225,
        });
    }
})();