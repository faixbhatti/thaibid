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

    function appCtrl($scope, $location, $rootScope, $filter, products, deleteModal) {
        const ctrl = this;

        $scope.showNav = $rootScope.showNav;
        $scope.previousPage = $rootScope.previousPage
        $scope.cart = $rootScope.cart;
        $scope.inCart = $rootScope.inCart;
        $scope.inDetail = $rootScope.inDetail;
        $scope.loggedIn = $rootScope.loggedIn;
        $scope.username = $rootScope.username;
        $scope.inMobile = $rootScope.inMobile;

        $scope.addToScreen = function() {
            $("#homescreen-modal").css("opacity", 0);
            $("#homescreen-modal").modal('open')
            const backdrop = document.querySelector('.modal-overlay');
            backdrop.style.background = "#26848c";
            backdrop.style.opacity = 0.8;
            $("#homescreen-modal").css("opacity", 1);
        }

        var group = [
            "$root.showNav",
            "$root.inCart",
            "$root.inDetail",
            "$root.loggedIn",
            "$root.username"
        ]

        $scope.$watchGroup(group, function(newValue, oldValue, scope) {
            [$scope.showNav,
                $scope.inCart,
                $scope.inDetail,
                $scope.loggedIn,
                $scope.username
            ] = newValue;
        }, true)

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true);

        ctrl.searching = function() {
            if (!$scope.search) {
                setTimeout(function() {
                    $('#search').focus()
                }, 200)
            }
            $scope.search = !$scope.search
        };

        $scope.logout = function() {
            $rootScope.loggedIn = false;
            $rootScope.username = "";
            $rootScope.cart = [];
            Materialize.toast("You've successfully logged out", 1000)
        };

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        }

        $scope.checkout = function() {
            $location.url('/checkout')
        };

        $scope.location = function(url) {
            $location.url('/category' + url)
        };

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

            document.addEventListener('scroll', goBackUp);

            $('.back-up').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0

                }, 'slow')
            })

            $('.show-login').on('click', function() {
                $('#login-modal').modal('open')
            })

            $('.materialboxed').materialbox();
            $('.collapsible').collapsible();

            $('.modal').modal()

            $('.tooltipped').tooltip()


            $(".dropdown-button").dropdown({
                inDuration: 300,
                outDuration: 225,
            });

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