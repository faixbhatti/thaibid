/**
 * Created by Afro on 4/4/2017.
 */
(function() {
    'use strict';

    var app = angular.module('thai');

    app.component('loginRegister', {
        bindings: {
            username: '=',
            loggedin: '='
        },
        templateUrl: 'app/login/login.html',
        controller: function() {
            var ctrl = this;
            ctrl.person = {};

            ctrl.signIn = function() {
                ctrl.loggedin = true;
                $('.modal').modal('close')
                setTimeout(function() {
                    Materialize.toast(`Welcome back ${ctrl.username}`, 4000)
                }, 1000)
            }

            ctrl.signUp = function() {
                ctrl.loggedin = true;
                $('.modal').modal('close')
                setTimeout(function() {
                    Materialize.toast(`Hello ${ctrl.username}!. Your new account has been created`, 4000)
                }, 1000)
            }

            $(document).ready(function() {
                $('.modal').modal()
            })

        }
    })
})();