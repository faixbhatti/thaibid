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
        controller: function($rootScope, $http, $location, httpService, $user) {
            const ctrl = this;
            ctrl.user = {};
            let points = Math.round(Math.random() * 100);
            ctrl.user.points = points;
            ctrl.newUser = {};
            ctrl.newUser.points = points;
            ctrl.forgotPassword = false;
            ctrl.register = false;
            ctrl.viewTerms = false;
            ctrl.passwordConfirm = '';
            ctrl.closeModal = () => {
                resetValues();
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

            ctrl.signIn = function(form) {
                httpService
                    .post('login', ctrl.user)
                    .then((data) => {
                            let user = data.data.data
                            $user.setUser(user);
                            $('.modal').modal('close');
                            $rootScope.$broadcast('loggedIn');

                            setTimeout(function() {
                                Materialize.toast(`Welcome back ${user.um_name}`, 1000)
                            }, 1000);
                            resetValues();
                            resetForm(form);
                        },
                        (err) => {
                            console.log(err)
                            Materialize.toast(`${err.data.meta.message}`)
                        })
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

            ctrl.reset = function(form) {
                $('.modal').modal('close');
                Materialize.toast(`A reset link has been sent to ${ctrl.email}.`, 2000);
                resetForm(form);
                resetValues()
            };

            ctrl.signUp = function(form) {
                httpService
                    .post('register', ctrl.newUser)
                    .then(res => {
                        Materialize.toast(`Hello ${ctrl.newUser.userName}!. Your new account has been created. 
                        Please login with your details.`, 5000)
                        resetValues();
                        resetForm(form);
                    }, err => {
                        console.log('Error')
                        Materialize.toast('Error processing');
                    })
            };

            ctrl.$onInit = () => {
                $('.modal').modal()
            }

        }
    });