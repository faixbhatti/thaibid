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
        ctrl.userMail = '';

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

        ctrl.registerEmail = (form) => {
            if (ctrl.userMail !== '') {
                Materialize.toast(`${ctrl.userMail} has successfully been registered`, 3000)
                ctrl.userMail = ''
            } else {
                Materialize.toast('Please enter your email address', 3000);
            }
        };

        mobView()

        ////////////////
        $(document).ready(function() {
            $('.collapsible').collapsible();
        })

    }
})();