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
            controller: appCtrl,
        });

    function appCtrl($scope, $location, $rootScope, $filter, products, deleteModal) {
        var ctrl = this;

        $scope.showNav = $rootScope.showNav;
        $scope.previousPage = $rootScope.previousPage
        $scope.cart = $rootScope.cart
        $scope.inCart = $rootScope.inCart
        $scope.inDetail = $rootScope.inDetail;
        $scope.loggedIn = $rootScope.loggedIn;
        $scope.username = $rootScope.username;
        $scope.footer = 'app/footer/footer.html';


        $scope.addToScreen = function() {
            $("#homescreen-modal").css("opacity", 0);
            $("#homescreen-modal").modal('open')
            var backdrop = document.querySelector('.modal-overlay');
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
        }, true)

        $scope.searching = function() {
            if (!$scope.search) {
                setTimeout(function() {
                    $('#search').focus()
                }, 200)
            }
            $scope.searchWord = ''
            $scope.results = []
            $scope.search = !$scope.search
        }

        $scope.logout = function() {
            $rootScope.loggedIn = false;
            $rootScope.username = "";
            Materialize.toast("You've successfully logged out", 1000)
        }

        $scope.goToCart = function() {
            if ($rootScope.loggedIn) {
                $rootScope.template = 'cart';
                $location.url('/user/' + $rootScope.username);
            } else {
                Materialize.toast('Please login before you continue', 1000)
            }
        }

        $scope.getTotal = function() {
            var total = 0;
            $scope.itemsInCart.forEach(item => total += item.price)
            return total
        }

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        }

        $scope.checkout = function() {
            $location.url('/checkout')
        }

        $scope.location = function(url) {
            $location.url('/category' + url)
        };

        var filter = $filter('filter')

        $scope.showResults = function() {
            $scope.loading = true;
            products.get().then(function(data) {
                var products = data.data;
                $scope.suggestions = products.slice(0, 10);
                var results = filter(products, $scope.searchWord)
                $scope.results = results;
                $scope.loading = false;
            })
        }


        ////////////////

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();