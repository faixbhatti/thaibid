(function() {
    'use strict';

    angular
        .module('thai')
        .factory('httpService', httpService);

    httpService.$inject = ['$http'];

    function httpService($http, $user) {
        const config = {
            headers: {
                "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667"
            }
        };

        const baseUrl = 'https://officeadm1n.bidxel.com/api/';

        return {
            post,
            get,
            put,
            getUserDetails
        };

        function post(url, data) {
            return $http.post(`${baseUrl}${url}`, data, config)
        }

        function get(url) {
            return $http.get(`${baseUrl}${url}`, config)
        }

        function getUserDetails(abUrl, userInfo, page) {
            // abUrl: data containing info related to a particular user. e.g auctions, order, userprofile
            //userInfo: Info about a particular user.
            //page: which page is requested to be viewed 
            const url = !!page ? `${baseUrl}${abUrl}?page=${page}` : `${baseUrl}${abUrl}`;
            const userConfig = abUrl !== 'order' && abUrl !== 'cart' ? {
                headers: {
                    "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
                    "Id": `${userInfo.um_id}`,
                    "Accesstoken": `${userInfo.access_token}`
                }
            } : {
                headers: {
                    "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
                    "Id": `19`,
                    "Accesstoken": `44c8ac7dd3d6d03d6d3c34a4eb6c33aa1500370378`
                }
            }
            return $http.get(url, userConfig);
        }

        function put(url, data) {
            return $http.put(`${baseUrl}${url}`, config)
        }
    }
})();