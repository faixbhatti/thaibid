/**
 * Created by Afro on 6/16/2017.
 */
'use strict';

angular.module('thai')
    .component('appSearchArea', {
        templateUrl: 'app/search-area/search-area.html',
        controller: searchCtrl,
        require: {
          app: '^app'
        },
        bindings: {
            search: '='
        }
    });

function searchCtrl($filter, products) {
    const ctrl = this;
    const filter = $filter('filter');
    ctrl.searchWord = '';
    ctrl.results = [];
    ctrl.limit = 30;

    ctrl.searching = function () {
        ctrl.app.searching()
    };

    ctrl.showResults = function () {
        ctrl.loading = true;
        products.get().then(function (data) {
            var products = data.data;
            ctrl.suggestions = products.slice(0, 10);
            var results = filter(products, ctrl.searchWord);
            ctrl.results = results;
            ctrl.loading = false;
        })
    };

    ctrl.$onInit = function () {

    }

}