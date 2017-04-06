/**
 * Created by Afro on 3/24/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');

    app.controller('navCtrl',function ($scope, $location, $routeParams) {
        $scope.searching = function () {
            $scope.search = true
            setTimeout(function () {
               $('#search').focus()
            },200)
        }

        $scope.location = function (url) {
            $location.url(url)
        };

        $scope.loggedIn = false;

        $scope.username = "";

        $scope.signIn = function () {
            $scope.loggedIn = true;
            $('.modal').modal('close')
            setTimeout(function () {
                Materialize.toast('Welcome back ' + $scope.username,4000)
            },1000)
        }

         $scope.signUp = function () {
            $scope.loggedIn = true;
            $('.modal').modal('close')
            setTimeout(function () {
                Materialize.toast('Hello ' + $scope.username + '!. Your new account has been created',4000)
            },1000)
        }


        $scope.url = $routeParams.category
    })
})()
