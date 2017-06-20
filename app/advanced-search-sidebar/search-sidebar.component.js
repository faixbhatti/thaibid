/**
 * Created by Afro on 6/16/2017.
 */
'use strict';
angular.module('thai')
    .component('appSearchSidebar', {
        templateUrl: 'app/advanced-search-sidebar/search-sidebar.html',
        controller: sideBarCtrl,
        bindings: {
            limit: '='
        }
    });

function sideBarCtrl() {
    var ctrl = this;
    ctrl.clicked = false;

    ctrl.setLimit = function (value) {
        ctrl.limit = value;
    };

    ctrl.clearFilters = () => {
        ctrl.limit = ctrl.defaultLimit;
        ctrl.clicked = !ctrl.clicked
    };

    ctrl.$onInit = function () {
        ctrl.defaultLimit = ctrl.limit;
        let slider = document.getElementById('uiSlider');

        noUiSlider.create(slider, {
            start: [20, 300],
            connect: true,
            step: 10,
            range: {
                'min': 10,
                'max': 1000
            }
        });

        slider.noUiSlider.on('update', function (values, handle) {
            if (handle === 1) {
                ctrl.left = values[handle]
            } else {
                ctrl.right = values[handle]
            }
        });
    }
}