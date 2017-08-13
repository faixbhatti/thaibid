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
            localStorage.authUser = JSON.stringify(user);
            this.authUser = user;
        }

        function getUser() {
            if (!!localStorage.authUser) {
                return JSON.parse(localStorage.authUser);
            }
        }

        function unauthenticate() {
            localStorage.removeItem('authUser')
        }

        function isAuthenticated() {
            return !!localStorage.authUser;
        }

    }
})();