(function() {
    'use strict';

    angular
        .module('thai')
        .factory('httpService', httpService);

    httpService.$inject = ['$http'];

    function httpService($http, $user, $rootScope) {
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
            getUserDetails,
            postUserDetails,
            search,
            verifyData
        };

        function post(url, data) {
            return $http.post(`${baseUrl}${url}`, data, config)
        }

        function get(url) {
            return $http.get(`${baseUrl}${url}`, config)
        }

        function postUserDetails(abUrl, userInfo, data, command) {
            if (userInfo) {
                let userConfig = {
                    headers: {
                        "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
                        "Id": `${userInfo.um_id}`,
                        "Accesstoken": `${userInfo.access_token}`
                    }
                };
                if (command === 'patch') {
                    return $http.patch(`${baseUrl}${abUrl}`, data, userConfig);

                } else if (command === 'put') {
                    return $http.put(`${baseUrl}${abUrl}`, data, userConfig);

                } else {
                    return $http.post(`${baseUrl}${abUrl}`, data, userConfig);
                }
            }
        }

        function verifyData(response) {
            //Function to verify that the response from the api is actually useful
            if (response.meta) {
                if (response.meta.code === 200) {
                    if (response.data) {
                        return response.data
                    }
                } else {
                    return false
                }
            } else {
                $user.unauthenticate();
                $rootScope.broadcast('loggedOut');
                Materialize.toast('Your session has expired, please log-in', 8000);
                return false;
            }


        }

        function getUserDetails(abUrl, userInfo, page) {
            // abUrl: data containing info related to a particular user. e.g auctions, order, userprofile
            //userInfo: Info about a particular user.
            //page: which page is requested to be viewed 
            if (userInfo) {
                const url = !!page ? `${baseUrl}${abUrl}?page=${page}` : `${baseUrl}${abUrl}`;
                const userConfig = {
                    headers: {
                        "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
                        "Id": `${userInfo.um_id}`,
                        "Accesstoken": `${userInfo.access_token}`
                    }
                };
                return $http.get(url, userConfig);
            }
        }

        function put(url, data) {
            return $http.put(`${baseUrl}${url}`, config)
        }

        function search(query) {
            let url = 'product';
            return $http.post(`${baseUrl}${url}`, { q: query }, config)
        }
    }
})();