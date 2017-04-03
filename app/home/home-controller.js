(function () {
    'use strict';

    var app = angular.module('thai');

    app.controller('homeCtrl',function ($scope,products) {
        function get() {
                products.get().then(function (data) {
                    $scope.products = data.data
                })
            }

            get()
    })
})()