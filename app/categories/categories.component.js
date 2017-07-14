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
            const ctrl = this;
            let hasEventListener = false;

            ctrl.location = function(url) {
                $location.url('/category' + url)
            };

            ctrl.endingTabActive = !ctrl.active ? true : false;

            ctrl.$onInit = () => {
                ctrl.top = document.querySelector('.home').offsetTop;
                ctrl.offset = document.querySelector('.nav-extended').offsetHeight;
                let categories = document.querySelector('.home.collection'),
                    categoryList = categories.querySelectorAll('.cat'),
                    pin = categories.parentElement.dataset.pin;

                if (pin) {
                    if (pin === "true") {
                        $(categories).pushpin({
                            top: ctrl.top,
                            offset: ctrl.offset,
                        });
                    }
                }


                ctrl.sinkElement = function() {
                    if (pin) {
                        if (pin === "true") {
                            hasEventListener = true;
                            let scroll = window.scrollY,
                                documentHeight = document.body.scrollHeight,
                                windowHeight = window.innerHeight;
                            if (scroll >= (documentHeight - windowHeight) * 0.70) {
                                categories.style.zIndex = "-1";
                            } else {
                                categories.style.zIndex = "1";
                            }
                        }
                    }
                }

                categoryList.forEach(item => {
                    let a = item.querySelector('a');
                    item.onmouseover = () => {
                        a.classList.add('white-text');
                    }
                    item.onmouseout = () => {
                        a.classList.remove('white-text');
                    }
                })

                window.addEventListener('scroll', ctrl.sinkElement)
            };

            ctrl.$onDestroy = () => {
                if (hasEventListener) window.removeEventListener('scroll', ctrl.sinkElement);
            }
        }

    });