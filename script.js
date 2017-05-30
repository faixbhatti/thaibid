(function() {
    'use strict';

    function main() {
        function goBackUp(params) {
            var scroll = window.scrollY,
                documentHeight = document.body.clientHeight,
                windowHeight = window.innerHeight;

            if (scroll >= (documentHeight - windowHeight) * 0.20) {
                $('.back-up').show()
            } else if (scroll < (documentHeight - windowHeight) * 0.20) {
                $('.back-up').hide()
            } else {
                $('.back-up').hide()
            }
        }

        document.addEventListener('scroll', goBackUp)

        $('.back-up').on('click', function() {
            $('html,body').animate({
                scrollTop: 0

            }, 'slow')
        })

        $('.show-login').on('click', function() {
            $('#login-modal').modal('open')
        })

        $('.materialboxed').materialbox();
        $('.collapsible').collapsible();

        $('.modal').modal()

        $('.tooltipped').tooltip()


        $(".dropdown-button").dropdown({
            inDuration: 300,
            outDuration: 225,
        });


        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 300
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        })

        $('.cart-button').sideNav({
            menuWidth: 300, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        })

        // $('.lang-button').dropdown()

        $('ul.tabs').tabs();

        $("#table").headroom({
            "offset": 80,
            "tolerance": 2,
            "classes": {
                "initial": "animated",
                "pinned": "appear",
                "unpinned": "dismiss"
            }
        });

        $("")
    }

    $(document).ready(main)


})()

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log('Service worker registered', reg)
    })
}