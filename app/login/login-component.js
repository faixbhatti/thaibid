/**
 * Created by Afro on 4/4/2017.
 */
'use strict';

angular.module('thai')
    .component('loginRegister', {
        bindings: {
            username: '=',
        },
        templateUrl: 'app/login/login.html',
        controller: function($rootScope) {
            var ctrl = this;
            ctrl.person = {};
            ctrl.forgotPassword = false;
            ctrl.register = false;

            ctrl.signIn = function() {
                $rootScope.loggedIn = true;
                $rootScope.username = ctrl.username;
                $('.modal').modal('close')
                setTimeout(function() {
                    Materialize.toast(`Welcome back ${ctrl.username}`, 1000)
                }, 1000)
            }

            ctrl.reset = function() {
                $('.modal').modal('close')
                Materialize.toast(`A reset link has been sent to ${ctrl.email}.`, 2000);
                ctrl.forgotPassword = false;
                ctrl.register = false;
            }

            ctrl.signUp = function() {
                $rootScope.loggedIn = true;
                $rootScope.username = ctrl.username;
                $('.modal').modal('close')
                setTimeout(function() {
                    Materialize.toast(`Hello ${ctrl.username}!. Your new account has been created`, 1000)
                }, 1000)
                ctrl.forgotPassword = false;
                ctrl.register = false;
            }

            $(document).ready(function() {
                $('.modal').modal()
            })

        }
    })