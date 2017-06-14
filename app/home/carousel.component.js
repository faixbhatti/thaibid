(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thai')
        .component('thCarousel', {
            template: `
            
                <div class="carousel carousel-slider center" data-indicators="true" ng-hide="dataLoading" style="height: 400px">
                    <div class="carousel-fixed-item center">
                        <a class="btn waves-effect white teal-text"><i class="material-icons teal-text left">menu</i>Categories</a>
                    </div>
                    <div class="carousel-item white-text" href="#one!" style="background: url('image/slideshow/carou-1.jpg')">
                        <h4 style="text-transform: uppercase; margin-top: 10%">Upgrade your spring wardrobe</h4>
                        <p class="white-text">Stylist men's T-shirts</p>
                    </div>
                    <div class="carousel-item white-text" href="#two!" style="background: url('image/slideshow/carou-1.jpg')">
                        <h4 style="text-transform: uppercase; margin-top: 10%">Denim duty</h4>
                        <p class="white-text">Find your favourite pair of jeans</p>
                    </div>
                    <div class="carousel-item white-text" href="#three!" style="background: url('image/slideshow/carou-1.jpg')">
                        <h4 style="text-transform: uppercase; margin-top: 10%">Wardrobe essentials</h4>
                        <p class="white-text">Tees and polos perfect for any occassion</p>
                    </div>
                    <div class="carousel-item white-text" href="#four!" style="background: url('image/slideshow/carou-1.jpg')">
                        <h4 style="text-transform: uppercase; margin-top: 10%">The look of spring</h4>
                        <p class="white-text">Save over 50%</p>
                    </div>
                </div>
            `,
            controller: slideCtrl,
        });

    function slideCtrl() {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() {
            $('.carousel.carousel-slider').carousel({ fullWidth: true });
        };
        $ctrl.$onChanges = function(changesObj) {};
        $ctrl.$onDestroy = function() {};
    }
})();