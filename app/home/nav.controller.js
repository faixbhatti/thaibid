/**
 * Created by Afro on 3/24/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.controller('navCtrl', function($scope, $location, $rootScope, $filter, products, deleteModal) {

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

        $rootScope.showNav = true;
        $rootScope.previousPage = "/home"
        $rootScope.cart = []
        $rootScope.inCart = false;
        $rootScope.inDetail = false;
        $rootScope.template = 'auctions'

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true)

        $scope.removeFromCart = function(index, list) {
            $('.cart-button').sideNav('hide');
            deleteModal.open(index, list)
        }

        $scope.checkout = function() {
            $location.url('/checkout')
        }

        $scope.footer = 'app/footer/footer.html'

        $scope.sideNav = 'app/sidenavs/sidenav.html'
        $scope.sideCart = 'app/sidenavs/sidecart.html'

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

        $rootScope.loggedIn = false;

        $rootScope.username = "";



        $(document).ready(function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })


    })
})()