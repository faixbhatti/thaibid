(function () {
    'use strict';
    
    var app = angular.module('thai')
    
    app.component('productList',{
        bindings: {
            products: '<',
            columns: '=',
            height: '='
        },
        templateUrl: 'app/products/product-list.html',
        controller: function ($scope, products) {

            















        //     var options = {
        //     color: '#aaa',
        //     // This has to be the same size as the maximum width to
        //     // prevent clipping
        //     strokeWidth: 4,
        //     trailWidth: 1,
        //     easing: 'easeInOut',
        //     text: {
        //         autoStyleContainer: false
        //     },
        //     from: {color: '#aaa', width: 4},
        //     to: {color: '#333', width: 6},
        //     // Set default step function for all animate calls
        //     step: function (state, circle) {
        //         circle.path.setAttribute('stroke', state.color);
        //         circle.path.setAttribute('stroke-width', state.width);
        //
        //         var value = Math.round(circle.value() * 100);
        //         if (value === 0) {
        //             circle.setText('');
        //         } else {
        //             circle.setText(value);
        //         }
        //
        //     }
        //
        // }
        //
        //
        // // $(document).ready(function () {
        // //     var bar;
        // //
        // //     for (var i = 1; i <= $scope.products.length; i++) {
        // //         var name = '.timer' + i;
        // //         options.duration = 1000000;
        // //         bar = new ProgressBar.Circle(name, options);
        // //         bar.text.style.fontFamily = '"Roboto", Helvetica, sans-serif';
        // //         bar.text.style.fontSize = '0.4rem';
        // //         bar.animate(1.0);
        // //     }
        // // })

        }
    })
})()