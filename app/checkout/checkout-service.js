    'use strict';

    angular.module('thai')
        .factory('Location', Location)
        .factory('Calculate', Calculate);

    function Location($http) {
        var districtIds = {},
            province,
            district,
            subDistrict;

        var location = {
            getProvinces: getProvinces,
            getDistricts: getDistricts,
            getSubDistricts: getSubDistricts
        };

        return location;

        ////////////////

        // Function that gets all the provinces in Thailand
        function getProvinces() {
            var url = 'https://api.openthailand.org/provinces' //url for api access

            $http.get(url).then(function(res) {
                var provinces = res.data.result.data;
                var data = {};

                provinces.forEach(province => data[province.name] = null) //Create a data object with the response from API

                $('#province.autocomplete').autocomplete({ //Enable autocomplete for the province field
                    "data": data,
                    limit: 15,
                    minLength: 1
                })
            });
        }


        // Function that returns all the districts in a particular province
        function getDistricts(prov) {
            var provinceList = prov.split(/\s+/), //Create a list from the province name string by splitting it
                provinceId = provinceList.join('-').toLowerCase(), //Join the list, creating a string separated by -
                url = `https://api.openthailand.org/provinces/${provinceId}/districts`;

            if (province !== provinceId) {
                province = provinceId;

                // Get all districts from the province
                $http.get(url).then(function(response) {
                    var districts = response.data.result.data,
                        data = {};

                    districts.forEach(district => {
                            data[district.name] = null;
                            districtIds[district.name] = district.id;
                        }) // Create a data object using API response 

                    $('#district.autocomplete').autocomplete({ // Enable autocomplete using response data
                        "data": data,
                        limit: 15,
                        minLength: 1
                    })
                });

            }
        }



        // Function that returns all subdistricts in a district
        function getSubDistricts(dist) {
            var districtId = districtIds[dist], //Get the district id from the list of district
                url = `https://api.openthailand.org/provinces/${province}/districts/${districtId}/subdistricts`;
            if (district !== districtId) {
                district = districtId;

                // Get list of subdistricts from API
                $http.get(url).then(function(response) {
                    var subDistricts = response.data.result.data;

                    var data = {};
                    subDistricts.forEach(subDistrict => data[subDistrict.name] = null) //Create a data object from API response

                    $('#sub-d.autocomplete').autocomplete({ //Enable autocomplete from data object
                        "data": data,
                        limit: 15,
                        minLength: 1
                    })
                });
            }
        }


    }

    function Calculate() {
        var calculate = {
            getTotal: getTotal,
            increment: increment,
            decrement: decrement
        }

        return calculate;

        function getTotal(items, ctrl) {
            var total = 0;
            items.forEach(item => total += item.price)
            return total
        }

        function decrement(item, ctrl, items) {
            if (item.quantity > 1) {
                item.quantity--;
                ctrl.total -= item.price;
            }
        };

        function increment(item, ctrl, items) {
            if (item.quantity < 3) {
                item.quantity++;
                ctrl.total += item.price;
            }
        };
    }