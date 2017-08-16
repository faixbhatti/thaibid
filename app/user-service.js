(function() {
    'use strict';

    angular
        .module('thai')
        .factory('$user', userService);

    function userService() {
        return {
            setUser,
            getUser,
            isAuthenticated,
            unauthenticate,
            authUser: {}
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

        function getUser() {
            if (!!localStorage.authUser) {
                return JSON.parse(localStorage.authUser);
            }
        }

        function unauthenticate() {
            localStorage.removeItem('authUser')
        }

        function statusChangeCallback(response) {
            return this.isAuthenticated(response.status === 'connected')
        }

        function isAuthenticated(status) {

            return !!localStorage.authUser;
        }

    }
})();