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
        }

    })