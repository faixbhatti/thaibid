/**
 * Created by Afro on 3/20/2017.
 */
(function () {
    'use strict';

    var app = angular.module('thai', []);

    app.controller('productCtrl',function ($scope) {
        $scope.products = [
            {
                name: 'Beautiful Scenery',
                price: 23.53,
                image: 'image/sky.jpg',
                timer: 24443
            },
            {
                name: 'Old fashioned pocket watch',
                price: 44.34,
                image: 'image/pocket.jpg',
                timer: 24443
            },
            {
                name: 'On a hot day this is fly',
                price: 20.34,
                image: 'image/jean-shoe.jpg',
                timer: 24443
            },
                        {
                name: 'Crazy work of art',
                price: 40.34,
                image: 'image/starz.jpg',
                timer: 24443
            },
            {
                name: 'When it goes down',
                price: 20.34,
                image: 'image/pocket.jpg',
                timer: 24443
            },
            {
                name: 'What a view',
                price: 40.14,
                image: 'image/sky.jpg',
                timer: 24443
            },
            {
                name: 'Classic All stars unisex sneakerss',
                price: 10.32,
                image: 'image/starz.jpg',
                timer: 24443
            },
            {
                name: 'Legendary all stars',
                price: 20.34,
                image: 'image/starz.jpg',
                timer: 24443
            },
            {
                name: 'Pocket kerchief for generations',
                price: 20.34,
                image: 'image/pocket.jpg',
                timer: 24443
            },
            {
                name: 'Work of art',
                price: 20.34,
                image: 'image/sky.jpg',
                timer: 24443
            },

            {
                name: 'Classic hand made leather',
                price: 21.53,
                image: 'image/shoe.jpg',
                timer: 24443
            },
            {
                name: 'Hot legs',
                price: 230.34,
                image: 'image/leg-shot.jpg',
                timer: 24443
            },
            {
                name: 'On a hot day this is fly',
                price: 20.34,
                image: 'image/jean-shoe.jpg',
                timer: 24443
            },
                        {
                name: 'Crazy work of art',
                price: 40.34,
                image: 'image/starz.jpg',
                timer: 24443
            },
            {
                name: 'When it goes down',
                price: 20.34,
                image: 'image/pocket.jpg',
                timer: 24443
            },
            {
                name: 'What a view',
                price: 40.14,
                image: 'image/sky.jpg',
                timer: 24443
            }
        ]


    })
})();