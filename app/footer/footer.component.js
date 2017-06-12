(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular //
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

        function mobView() {
            if (window.innerWidth < 993) {
                ctrl.inMobile = true;
            } else {
                ctrl.inMobile = false;
            }
        }

        mobView()

        ////////////////
        $(document).ready(function() {
            $('.collapsible').collapsible();
        })

    }
})();