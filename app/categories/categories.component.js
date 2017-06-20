/**
 * Created by Afro on 3/29/2017.
 */
'use strict';

angular.module('thai')
    .component('allCategories', {
        bindings: {
            active: '<'
        },
        templateUrl: 'app/categories/categories.html',
        controller: function ($location) {
            const ctrl = this;
            let hasEventListener = false;

            ctrl.location = function (url) {
                $location.url('/category' + url)
            };

            ctrl.$onInit = () => {
                ctrl.top = document.querySelector('.home').offsetTop;
                ctrl.offset = document.querySelector('.nav-extended').offsetHeight;
                let categories = document.querySelector('.home'),
                    pin = categories.parentElement.dataset.pin;

                if (pin) {
                    if (pin === "true") {
                        $(categories).pushpin({
                            top: ctrl.top,
                            offset: ctrl.offset,
                        });
                    }
                }


                function sinkElement() {
                    if (pin) {
                        if (pin === "true") {
                            hasEventListener = true;
                            let scroll = window.scrollY,
                                documentHeight = document.body.clientHeight,
                                windowHeight = window.innerHeight;
                            if (scroll >= (documentHeight - windowHeight) * 0.70) {
                                categories.style.zIndex = "-1";
                            } else {
                                categories.style.zIndex = "1";
                            }
                        }
                    }
                }

                window.addEventListener('scroll', sinkElement)
            };

            ctrl.$onDestroy = () => {
                if (hasEventListener)window.removeEventListener('scroll', sinkElement);
            }
        }

    });