(function() {
    'use strict';

    var app = angular.module('thai');

    app.factory('cart', cart);

    function cart() {
        var cartButton = {
                shake: shake
            }
            ////////////////
        return cartButton

        function shake() {
            var button = document.querySelector('.cart-button');
            button.classList.add('rubberBand')

            function removeAnimation(e) {
                button.classList.remove('rubberBand')
            }
            button.addEventListener('animationend', removeAnimation);
        }
    }
})();