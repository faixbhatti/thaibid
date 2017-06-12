    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular.module('thai')
        .component('guarantees', {
            templateUrl: 'app/assurances/assurance.html',
            bindings: {
                show: '<'
            },
            controller: viewCtrl

        });

    function viewCtrl() {
        var ctrl = this;

        function mobView() {
            if (window.innerWidth < 993) {
                ctrl.inMobile = true;
            } else {
                ctrl.inMobile = false;
            }
        }

        mobView()
    }