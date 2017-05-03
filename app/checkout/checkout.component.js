(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');

    app.component('checkout', {
        templateUrl: 'app/checkout/checkout.html',
        controller: checkCtrl,
    });


    function checkCtrl($scope, $rootScope, $http, $location) {

        $scope.items = $rootScope.cart;
        $rootScope.inCart = true;

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
            }
        ]

        // $scope.items = [...extras]

        $scope.items.forEach(item => item.quantity = 1)

        $rootScope.showNav = false;

        $scope.all = true;

        $scope.billing = {}

        $scope.templates = [
            'app/checkout/billing.html',
            'app/checkout/delivery.html',
            'app/checkout/order.html'
        ]

        $scope.step = 0;

        $scope.oneClean = true;
        $scope.twoClean = true;
        $scope.oneFinished = false;
        $scope.twoFinished = false;

        $scope.stepTo = function(step) {
            $scope.step = step
            if (step === 1) $scope.oneFinished = true;
            if (step === 2) $scope.twoFinished = true;

            $scope.template = $scope.templates[step]
        }

        $scope.goBack = function() {
            if ($scope.nextStep === true) {
                $scope.nextStep = false;
                return;
            }
            $location.url($scope.previousPage)
        }

        $scope.imgs = [
            'Icons/2co.png',
            'Icons/paypal.png',
            'Icons/moneygram.png',
            'Icons/mastercard.png',
            'Icons/visa.png',
        ]

        $scope.selectPayment = function(option) {
            $scope.paymentOption = option
        }

        var districtIds = {},
            province,
            district,
            subDistrict;

        $scope.getDistrict = function(prov) {
            var prList = prov.split(/\s+/);
            var provinceId = prList.join('-').toLowerCase()

            if (province !== provinceId) {
                province = provinceId;

                $http.get(`https://api.openthailand.org/provinces/${provinceId}/districts`).then(function(response) {
                    var districts = response.data.result.data;

                    var data = {};

                    districts.forEach(district => {
                        data[district.name] = null;
                        districtIds[district.name] = district.id;
                    })

                    $('#district.autocomplete').autocomplete({
                        "data": data,
                        limit: 15,
                        minLength: 1
                    })
                });
            }
        }

        $scope.getSubDistrict = function(dist) {
            var districtId = districtIds[dist]

            if (district !== districtId) {
                district = districtId

                $http.get(`https://api.openthailand.org/provinces/${province}/districts/${districtId}/subdistricts`).then(function(response) {
                    var sd = response.data.result.data;

                    var data = {};

                    sd.forEach(d => data[d.name] = null)

                    $('#sub-d.autocomplete').autocomplete({
                        "data": data,
                        limit: 15,
                        minLength: 1
                    })
                });
            }
        }

        $scope.template = $scope.templates[0]

        $scope.getTotal = function() {
            var total = 0;
            $scope.items.forEach(item => total += item.price)
            return total
        }


        $scope.previousPage = $rootScope.previousPage;

        $scope.increment = function(item) {
            if (item.quantity < 3) item.quantity++
        };

        $scope.decrement = function(item) {
            if (item.quantity > 1) item.quantity--
        };


        $(document).ready(function() {
                $http.get('https://api.openthailand.org/provinces').then(function(response) {
                    var provinces = response.data.result.data;
                    var data = {};

                    provinces.forEach(province => data[province.name] = null)

                    $('#province.autocomplete').autocomplete({
                        "data": data,
                        limit: 15,
                        minLength: 1
                    })
                });
            })
            ////////////////
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
})();