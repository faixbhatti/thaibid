(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('addToHomescreen', {
            templateUrl: 'app/add-to-homescreen/add-homescreen.html',
            controller: homescreenCtrl
        });

    function homescreenCtrl() {
        var ctrl = this;

        ctrl.close = function() {
            var backdrop = document.querySelector('.modal-overlay');
            backdrop.style.background = "#000";
            $("#homescreen-modal").modal('close')
        }

        $(document).ready(function() {
            $("#homescreen-modal").modal()
        })

        ////////////////

    }
})();