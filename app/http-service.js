(function() {
    'use strict';

    angular
        .module('thai')
        .factory('httpService', httpService);

    httpService.$inject = ['$http'];

    function httpService($http) {
        const config = {
            headers: {
                "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667"
            }
        }

        const baseUrl = 'http://officeadm1n.bidxel.com/api/'

        const service = {
            post,
            get,
            put
        };

        return service;

        ////////////////
        function post(url, data) {
            return $http.post(`${baseUrl}${url}`, data, config)
        }

        function get(url) {
            return $http.get(`${baseUrl}${url}`, config)
        }

        function put(url) {
            return $http.put()
        }
    }
})();