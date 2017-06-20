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
        controller: function ($rootScope, $http, $location) {
            const ctrl = this;
            ctrl.user = {};
            ctrl.newUser = {};
            ctrl.forgotPassword = false;
            ctrl.register = false;
            ctrl.viewTerms = false;

            ctrl.closeModal = () => {
                ctrl.forgotPassword = false;
                ctrl.register = false;
                ctrl.viewTerms = false;
                $('.modal').modal('close');
            };

            const resetValues = () => {
                ctrl.forgotPassword = false;
                ctrl.register = false;
                ctrl.viewTerms = false;
                ctrl.user = {};
                ctrl.newUser = {};
                ctrl.email = '';
            };

            const resetForm = (form) => {
                form.$setPristine();
                form.$setUntouched();
            };

            ctrl.signIn = function (form) {
                $rootScope.loggedIn = true;
                $rootScope.username = ctrl.user.username;
                $('.modal').modal('close');

                setTimeout(function () {
                    Materialize.toast(`Welcome back ${ctrl.username}`, 1000)
                }, 1000);
                resetValues();
                resetForm(form);
            };


            ctrl.view = (tab) => {
                switch (tab) {
                    case 'login':
                        resetValues();
                        break;
                    case 'resetPassword':
                        ctrl.forgotPassword = !ctrl.forgotPassword;
                        break;
                    case 'terms':
                        ctrl.register = false;
                        ctrl.viewTerms = true;
                        break;
                    case 'register':
                        ctrl.register = true;
                        ctrl.viewTerms = false;
                        break;
                    default:
                        resetValues()
                }

            };

            ctrl.reset = function (form) {
                $('.modal').modal('close');
                Materialize.toast(`A reset link has been sent to ${ctrl.email}.`, 2000);
                resetForm(form);
                resetValues()
            };

            ctrl.signUp = function (form) {
                $rootScope.loggedIn = true;
                $rootScope.username = ctrl.newUser.username;
                $rootScope.template = "editProfile";

                Materialize.toast(`Hello ${ctrl.newUser.username}!. Your new account has been created`, 1000)

                $('.modal').modal('close');

                setTimeout(() => {
                    Materialize.toast(`Please complete your profile before proceeding`, 3000)
                }, 2000);

                resetValues();
                resetForm(form);

                $location.url(`/user/${$rootScope.username}`);
            };

            ctrl.$onInit = () => {
                $('.modal').modal()
            }

        }
    });