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

function searchCtrl($filter, httpService) {
    const ctrl = this;
    ctrl.spinnerPosition = 'absolute'
    ctrl.searchWord = "";
    ctrl.results = [];
    ctrl.limit = 30;

    ctrl.searching = function() {
        ctrl.app.searching()
    };

    ctrl.showResults = function() {
        ctrl.loading = true;
        httpService
            .search(ctrl.searchWord)
            .then(data => {
                let res = data.data;
                if (res.meta.code === 200) {
                    if (res.data) {
                        ctrl.loading = false;
                        ctrl.results = res.data;
                    } else {
                        ctrl.loading = false;
                        ctrl.results = [];
                    }

                }
            })
    };

    ctrl.$onInit = function() {

    }

}