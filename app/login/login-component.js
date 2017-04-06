/**
 * Created by Afro on 4/4/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');

    app.component('loginRegister', {
        bindings: {
            username: '<'
        },
        templateUrl: 'app/login/login.html',
        controller: function () {
            var ctrl = this;
            ctrl.person = {};

            ctrl.login = function () {
                $('#modal1').modal('close');

            };

            ctrl.register = function () {
                ctrl.username = ctrl.person.user;
                ctrl.user = true;
            }

            $(document).ready(function () {
                $('.modal').modal()
            })

        }
    })
})();