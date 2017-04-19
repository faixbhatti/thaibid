/**
 * Created by Afro on 3/24/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.controller('navCtrl', function($scope, $location, $routeParams, $rootScope) {
        $scope.searching = function() {
            $scope.search = true
            setTimeout(function() {
                $('#search').focus()
            }, 200)
        }

        $rootScope.showNav = true;

        $rootScope.previousPage = "#!/home"

        $rootScope.cart = []
        $rootScope.$watch('cart', function(newValue, oldValue, scope) {
            $scope.itemsInCart = newValue;
        }, true)

        $scope.removeFromCart = function(index) {
            $scope.itemsInCart.splice(index, 1)
            Materialize.toast('Item removed from cart', 3000, 'red lighten-2')
        }

        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.itemsInCart.length; i++) {
                total += $scope.itemsInCart[i].price
            }
            return total
        }


        $scope.location = function(url) {
            $location.url('/category' + url)
        };

        $scope.loggedIn = false;

        $scope.username = "";

        $scope.signIn = function() {
            $scope.loggedIn = true;
            $('.modal').modal('close')
            setTimeout(function() {
                Materialize.toast('Welcome back ' + $scope.username, 4000)
            }, 1000)
        }
        $(document).ready(function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })

        $scope.signUp = function() {
            $scope.loggedIn = true;
            $('.modal').modal('close')
            setTimeout(function() {
                Materialize.toast('Hello ' + $scope.username + '!. Your new account has been created', 4000)
            }, 1000)
        }


        $scope.url = $routeParams.category
    })
})()