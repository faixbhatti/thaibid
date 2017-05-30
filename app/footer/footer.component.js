(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('thFooter', {
            templateUrl: 'app/footer/footer.html',
            controller: footerCtrl,
            bindings: {
                show: "<"
            }
        });

    function footerCtrl($rootScope) {
        var ctrl = this;

        $rootScope.$watch('showNav', function(newValue, oldValue) {
                ctrl.show = newValue;
            })
            ////////////////
        $(document).ready(function() {
            $('.collapsible').collapsible();
        })

    }
})();