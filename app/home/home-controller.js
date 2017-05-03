(function() {
    'use strict';

    var app = angular.module('thai');

    app.controller('homeCtrl', function($scope, products, $rootScope) {
        $scope.dataLoading = true;

        function get() {
            products.get().then(function(data) {
                $scope.products = data.data;
                $scope.dataLoading = false;
            })
        }

        get()

        $rootScope.inCart = false;

        var extras = [{
                "id": 21,
                "name": "Classic beach wear",
                "price": 20.34,
                "image": "image/leather-bag.jpg",
                "timer": "2017-03-24"
            },
            {
                "id": 22,
                "name": "All black swagger",
                "price": 23.53,
                "image": "image/men__black-converse.jpeg",
                "timer": "2017-03-24"
            },
            {
                "id": 23,
                "name": "Dirty ass shoes",
                "price": 44.34,
                "image": "image/men__dirty-shoes.jpeg",
                "timer": "2017-03-24"
            },
            {
                "id": 24,
                "name": "On a sunny day",
                "price": 20.34,
                "image": "image/men__mad-shades.jpeg",
                "timer": "2017-03-24"
            },
            {
                "id": 26,
                "name": "Cool shades",
                "price": 20.34,
                "image": "image/men__leather-casual.jpg",
                "timer": "2017-03-24"
            },
            {
                "id": 27,
                "name": "Omaru shakur",
                "price": 40.34,
                "image": "image/men__tu-pac.jpg",
                "timer": "2017-03-24"
            },
            {
                "id": 28,
                "name": "Cool shades",
                "price": 20.34,
                "image": "image/men__beach-shades.jpeg",
                "timer": "2017-03-24"
            },
            {
                "id": 25,
                "name": "Yeeezzzys yooo",
                "price": 40.34,
                "image": "image/ladies__yeezys.jpeg",
                "timer": "2017-03-24"
            }
        ]


        $rootScope.showNav = true;

        $scope.loading = false;
        $scope.food = 'beans'
        var loading = false;



        $scope.loadMore = function(e) {
            var scroll = window.scrollY,
                documentHeight = document.body.clientHeight,
                windowHeight = window.innerHeight;

            if (scroll >= (documentHeight - windowHeight) * 0.70) {

                if (!loading) {
                    loading = true
                    $scope.loading = true;
                    var prod = document.querySelector('#prod-list');
                    prod.click()

                    setTimeout(() => {
                        $scope.products.push(...extras)
                        $scope.loading = false;
                        prod.click()
                    }, 3000)
                }

            }

        }


        // function pinElement() {
        //     var products = document.querySelector('#prod-list'),
        //         categories = document.querySelector('.home'),
        //         header = document.querySelector('#header'),
        //         offset = header.offsetHeight + 50,
        //         bottom = products.clientHeight - 60;


        //     $(categories).pushpin({
        //         top: $('.home').offset().top,
        //         offset: offset,
        //         bottom: bottom - offset,
        //     });

        //     docLoaded = true;
        // }


        document.addEventListener('scroll', $scope.loadMore)

        $(document).ready(function() {

            // pinElement()
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        })
    })
})()