(function() {
    'use strict';

    angular
        .module('thai')
        .directive('placehold', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function() {
                        console.log(element.text)
                    });
                }
            };
        })
})();