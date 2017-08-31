'use strict';

angular.module('thai')
    .component('homePage', {
        templateUrl: 'app/home/home.html',
        controller: homeCtrl
    });

function homeCtrl($scope, httpService, $rootScope) {
    const ctrl = this;
    $scope.dataLoading = true;
    ctrl.spinnerPosition = 'absolute';

    function get() {
        httpService
            .get(`category/home-garden`)
            .then(function(data) {
                let fetched = data.data;
                if (fetched.meta.code !== 400) {
                    if (fetched.data) {
                        $scope.products = fetched.data.data;
                        $scope.dataLoading = false;
                        $scope.deals = $scope.products;
                        // $scope.rest = $scope.products.slice(8);
                    }
                }

            }, (err) => {

            });
        httpService
            .get('home-slider')
            .then(data => {
                let res = data.data;
                if (res.meta.code !== 400) {
                    ctrl.slideImages = res.data;
                    setTimeout(() => {
                        $('.slider').slider();
                    }, 2000)
                }
            })

    }

    get();

    $rootScope.inCart = false;

    $scope.moveSlider = (direction) => {
        $('.slider').slider(direction);
    }

    $rootScope.inDetail = false;

    $rootScope.showNav = true;

    $scope.loading = false;
    let loading = false;

    $scope.loadMore = function() {
        let scroll = window.scrollY,
            documentHeight = document.body.scrollHeight,
            windowHeight = window.innerHeight;

        if (scroll >= (documentHeight - windowHeight) * 0.70) {
            if (!loading) {
                loading = true;
                $scope.loading = true;
                let prod = document.querySelector('#prod-list');
                prod.click();

                setTimeout(() => {
                    $scope.rest.push(...extras);
                    $scope.loading = false;
                    prod.click()
                }, 2000)
            }

        }
    };

    ctrl.$onInit = () => {
        $('.slider').slider();
        // document.addEventListener('scroll', $scope.loadMore);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        $(".dropdown-button").dropdown({
            inDuration: 300,
            outDuration: 225,
        });

    };

    ctrl.$onDestroy = () => {
        window.removeEventListener('scroll', $scope.loadMore);
    }
}