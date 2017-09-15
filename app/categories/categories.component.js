/**
 * Created by Afro on 3/29/2017.
 */
'use strict';

angular.module('thai')
    .directive('addHover', function() {
        return function(scope, element, attrs) {
            let cat = angular.element(element)[0];
            let a = cat.querySelector('a');
            cat.onmouseover = () => {
                a.classList.add('white-text');
            }
            cat.onmouseout = () => {
                if (!cat.classList.contains('main-green')) {
                    a.classList.remove('white-text');
                }
            }
        }
    })
    .component('allCategories', {
        bindings: {
            active: '<',
        },
        templateUrl: 'app/categories/categories.html',
        controller: function($location, httpService) {
            const ctrl = this;
            ctrl.loading = true;
            let hasEventListener = false;

            ctrl.location = function(url) {
                if (url === 'redeem-shop') $location.url(`/${url}`)
                else $location.url(`/category/${url}`)
            };
            let categories;

            function addHoverFunction() {
                ctrl.categoryList.forEach(item => {
                    let a = item.querySelector('a');
                    item.onmouseover = () => {
                        a.classList.add('white-text');
                    }
                    item.onmouseout = () => {

                        a.classList.remove('white-text');
                    }
                })
            }

            (function get() {
                let categories = localStorage.getItem('categories');
                if (categories) {
                    ctrl.loading = false;
                    ctrl.categories = JSON.parse(categories);
                } else {
                    httpService
                        .get('category')
                        .then(res => {
                            ctrl.loading = false;
                            ctrl.categories = res.data.data

                        })
                }
            })()

            ctrl.$onInit = () => {
                ctrl.top = document.querySelector('.home').offsetTop;
                ctrl.offset = document.querySelector('.nav-extended').offsetHeight;
                categories = document.querySelector('.home.collection');
                ctrl.categoryList = categories.querySelectorAll('.cat');

                let pin = categories.parentElement.dataset.pin;

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

                ctrl.endingTabActive = ctrl.active === undefined ? true : false;

                window.addEventListener('scroll', ctrl.sinkElement)
            };

            ctrl.$onDestroy = () => {
                if (hasEventListener) window.removeEventListener('scroll', ctrl.sinkElement);
                $(categories).pushpin('remove');
            }
        }

    });