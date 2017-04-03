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
        }

        $scope.url = $routeParams.category
    })
})()
