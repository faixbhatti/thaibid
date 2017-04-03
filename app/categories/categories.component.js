/**
 * Created by Afro on 3/29/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai');

    app.component('allCategories',{
        	bindings:{
        		active: '<'
        	},
            templateUrl: 'app/categories/categories.html'

    })
})()