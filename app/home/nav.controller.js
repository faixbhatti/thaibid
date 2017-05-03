/**
 * Created by Afro on 3/24/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.controller('navCtrl', function($scope, $location, $rootScope) {

        $scope.searching = function() {
            $scope.search = true
            setTimeout(function() {
                $('#search').focus()
            }, 200)
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

        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true)

        $scope.removeFromCart = function(index) {
            $scope.itemsInCart.splice(index, 1)
            Materialize.toast('Item removed from cart', 3000, 'red lighten-2')
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

        $rootScope.loggedIn = false;

        $scope.username = "";


        $(document).ready(function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })


    })
})()