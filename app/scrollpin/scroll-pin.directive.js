    'use strict';

    angular
        .module('thai')
        .directive('scrollPin', scrollPinDirective);

    function scrollPinDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                top: '@',
                offset: '@',
                bottom: '@'
            }
        };
        return directive;

        function link(scope, element, attrs) {


        }
    }