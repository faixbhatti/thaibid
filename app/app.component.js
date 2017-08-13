(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('app', {
            templateUrl: 'app/app.component.html',
            controller: appCtrl
        });

    function appCtrl($scope, $location, $rootScope, $filter, products, deleteModal, $user) {
        const ctrl = this;
        const mql = $rootScope.inMobile;


        $scope.showNav = $rootScope.showNav;
        $scope.previousPage = $rootScope.previousPage
        $scope.cart = $rootScope.cart;
        $scope.inCart = $rootScope.inCart;
        $scope.inDetail = $rootScope.inDetail;
        $scope.inMobile = $rootScope.inMobile.matches;
        $scope.shopRedeem = $rootScope.shopRedeem;
        $scope.search = $rootScope.searching;

        $scope.loggedIn = $user.isAuthenticated();
        $scope.user = $user.getUser();

        $rootScope.$on('loggedIn', () => {
            $scope.loggedIn = $user.isAuthenticated();
            $scope.user = $user.getUser();
        })
        let group = [
            "$root.showNav",
            "$root.inCart",
            "$root.inDetail",
            "$root.shopRedeem",
            "$root.searching"
        ];

        $scope.$watchGroup(group, function(newValue, oldValue, scope) {
            [$scope.showNav,
                $scope.inCart,
                $scope.inDetail,
                $scope.shopRedeem,
                $scope.search
            ] = newValue;
        }, true);

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true);

        ctrl.searching = function() {
            if (!$scope.search) {
                setTimeout(function() {
                    $('#search').focus()
                }, 200)
            }
            $rootScope.searching = !$rootScope.searching
            setTimeout(() => initComponents(), 400);
        };

        $scope.logout = function() {
            $rootScope.loggedIn = false;
            $rootScope.user = {};
            $rootScope.cart = [];
            Materialize.toast("You've successfully logged out", 1000)
        };

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        };

        $scope.checkout = function() {
            $location.url('/checkout')
        };

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
            $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 300
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens 
            });
        }

        ctrl.$onDestroy = function() {
            window.removeEventListener('scroll', goBackUp)
        };

        ctrl.$onInit = function() {
            function goBackUp(params) {
                const scroll = window.scrollY,
                    documentHeight = document.body.scrollHeight,
                    windowHeight = window.innerHeight;

                if (scroll >= (documentHeight - windowHeight) * 0.20) {
                    $('.back-up').show()
                } else if (scroll < (documentHeight - windowHeight) * 0.20) {
                    $('.back-up').hide()
                } else {
                    $('.back-up').hide()
                }
            }

            function showMobile(e) {
                $scope.inMobile = e.matches;
                if ($scope.inMobile) {
                    $('.cart-button').sideNav({
                        menuWidth: 300, // Default is 300
                        edge: 'right', // Choose the horizontal origin
                        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                        draggable: false // Choose whether you can drag to open on touch screens
                    });

                    $('.button-collapse').sideNav({
                        menuWidth: 300, // Default is 300
                        edge: 'left', // Choose the horizontal origin
                        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                        draggable: true // Choose whether you can drag to open on touch screens 
                    });
                }
            }

            mql.addListener(showMobile);

            document.addEventListener('scroll', goBackUp);

            $('.back-up').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0

                }, 'slow')
            })

            $('.materialboxed').materialbox();
            $('.collapsible').collapsible();

            $('.modal').modal()

            initComponents()

            $('ul.tabs').tabs();

            $("#table").headroom({
                "offset": 80,
                "tolerance": 2,
                "classes": {
                    "initial": "animated",
                    "pinned": "appear",
                    "unpinned": "dismiss"
                }
            });
        }
    }
})();