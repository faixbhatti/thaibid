(function() {
    'use strict';

    angular
        .module('thai')
        .factory('$user', userService);

    function userService($http, $rootScope) {
        return {
            setUser,
            getUser,
            isAuthenticated,
            unauthenticate,
            authUser: {},
            logout
        }

        ////////////////
        function setUser(user) {
            if (typeof(user) === 'object') {
                localStorage.authUser = JSON.stringify(user);
                this.authUser = user;
                return true
            } else {
                return false;
            }
        }

        function logout(userInfo) {
            let userConfig = {
                headers: {
                    "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
                    "Id": `${userInfo.um_id}`,
                    "Accesstoken": `${userInfo.access_token}`
                }
            };
            $http.post('https://officeadm1n.bidxel.com/api/logout ', {}, userConfig)
                .then(data => {
                    if (data.data) {
                        if (data.data.meta) {
                            if (data.data.meta.code === 200) {
                                localStorage.removeItem('authUser');
                                $rootScope.$broadcast('loggedOut');
                                Materialize.toast('Logged out successfully', 2000);
                            }
                        }
                    }
                })
        }

        function getUser() {
            if (!!localStorage.authUser) {
                return JSON.parse(localStorage.authUser);
            }
        }

        function unauthenticate() {
            let user = this.getUser();
            this.logout(user);
        }

        function statusChangeCallback(response) {
            return this.isAuthenticated(response.status === 'connected')
        }

        function isAuthenticated() {

            return !!localStorage.authUser;
        }

    }
})();