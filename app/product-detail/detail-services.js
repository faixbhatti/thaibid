    'use strict';
    angular.module('thai')
        .factory('$misc', misc);

    function misc() {
        var cartButton = {
                shake,
                capitalizeText
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

        function capitalizeText(text) {
            let newText = text[0].toUpperCase() + text.slice(1);
            return newText;
        }
    }