(function() {
    'use strict';

    var app = angular.module('thai');

    app.controller('homeCtrl', function($scope, products, $rootScope) {
        function get() {
            products.get().then(function(data) {
                $scope.products = data.data
            })
        }

        get()

        $rootScope.showNav = true;

        var products = $('#prod-list'),
            prodTop = products.offset().top,
            height = prodTop + products.outerHeight();

        $(document).ready(function() {
            $('.home').pushpin({
                top: $('.home').offset().top,
                offset: 120,
                bottom: 1000
            });

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
    })
})()