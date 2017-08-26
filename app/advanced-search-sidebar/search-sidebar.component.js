/**
 * Created by Afro on 6/16/2017.
 */
'use strict';
angular.module('thai')
    .filter('price', price)
    .component('appSearchSidebar', {
        templateUrl: 'app/advanced-search-sidebar/search-sidebar.html',
        controller: sideBarCtrl,
        bindings: {
            products: '='
        }
    });



function price() {
    return priceFilter;

    ////////////////

    function priceFilter(products, min, max) {
        let filteredProds = [];
        products.forEach(product => {
            if (product.pm_is_redeemable) {
                if ((product.pm_redeem_point === min || product.pm_redeem_point > min) && (product.pm_redeem_point === max || product.pm_redeem_point < max)) {
                    if (product.pm_is_redeemable) {
                        filteredProds.push(product)
                    }
                }
            } else {
                if ((product.pm_minimumbid === min || product.pm_minimumbid > min) && (product.pm_minimumbid === max || product.pm_minimumbid < max)) {
                    if (!product.pm_is_redeemable) {
                        filteredProds.push(product)
                    }
                }
            }

        });
        return filteredProds
    }
}

function sideBarCtrl(priceFilter) {
    const ctrl = this;
    ctrl.clicked = false;
    ctrl.minPrice = 0
    ctrl.maxPrice = 0;
    ctrl.tempProducts = [];

    ctrl.setFilter = function(filter) {

    };

    ctrl.setPriceLimits = () => {
        if (ctrl.maxPrice === 0 && ctrl.minPrice === 0) {
            return
        }
        ctrl.tempProducts = [...ctrl.products]
        ctrl.products = priceFilter(ctrl.products, ctrl.minPrice, ctrl.maxPrice)
    }

    ctrl.clearFilters = () => {
        ctrl.products = ctrl.tempProducts !== [] ? [...ctrl.tempProducts] : ctrl.products;
        resetValues();
    };

    function resetValues() {
        ctrl.tempProducts = [];
        ctrl.maxPrice = 0;
        ctrl.minPrice = 0;
    }

    ctrl.$onInit = function() {
        ctrl.defaultLimit = ctrl.limit;

    }
}