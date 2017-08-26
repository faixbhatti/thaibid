(function() {

    'use strict';

    const offlineBanner = document.querySelector('.data__offline');
    const header = document.querySelector('#header');

    document.addEventListener('DOMContentLoaded', function(event) {
        if (!navigator.onLine) {
            offlineBanner.classList.remove('hide')
            header.classList.add('offline');
            Materialize.toast('You are offline', 3000)
        }

        window.addEventListener('online', updateNetworkStatus, false)
        window.addEventListener('offline', updateNetworkStatus, false);

        function updateNetworkStatus(event) {
            if (navigator.onLine) {
                Materialize.toast('You are now online', 4000)
                offlineBanner.classList.add('hide')
                header.classList.remove('offline');
            } else {
                Materialize.toast('You are offline', 4000)
                offlineBanner.classList.remove('hide')
                header.classList.add('offline');
            }
        }
    })


})();