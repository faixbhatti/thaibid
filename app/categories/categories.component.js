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
        controller: function($location) {
            var ctrl = this;

            ctrl.location = function(url) {
                $location.url('/category' + url)
            }

            ctrl.$onInit = () => {
                ctrl.top = document.querySelector('.home').offsetTop;
                ctrl.offset = document.querySelector('.nav-extended').offsetHeight;
                let categories = document.querySelector('.home'),
                    documentHeight = document.body.clientHeight,
                    windowHeight = window.innerHeight,
                    pin = categories.parentElement.dataset.pin

                if (pin) {
                    if (pin === "true") {
                        $(categories).pushpin({
                            top: ctrl.top,
                            offset: ctrl.offset,
                        });
                    }
                }


                function sinkElement(params) {
                    let scroll = window.scrollY;
                    if (scroll >= (documentHeight - windowHeight) * 0.80) {
                        categories.style.zIndex = "-1";
                    } else {
                        categories.style.zIndex = "1";
                    }
                }

                window.addEventListener('scroll', sinkElement)
            }
        }

    })