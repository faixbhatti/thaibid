/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userEditProfile', {
        templateUrl: 'app/profile-page/edit-profile/edit-profile.html',
        controller: editCtrl,
        require: {
            user: '^userProfile'
        }
    });

function editCtrl($http) {
    const ctrl = this;
    ctrl.user = {};

    ctrl.saveProfile = () => {
        Materialize.toast('Profile saved successfully', 1000)
    };
    ctrl.goBack = (location) => {
        ctrl.user.switchTab(location);
    };


    ctrl.$onInit = function() {
        ctrl.username = ctrl.user.username;

        const url = 'https://restcountries.eu/rest/v2/all',
            data = {};

        $('select.icons').material_select();

        $http.get(url).then(function(response) {
            let places = response.data;

            places.forEach(place => {
                data[place.name] = place.flag
            })

            $('input.autocomplete').autocomplete({
                "data": data,
                limit: 15,
                minLength: 1
            })
        });
    }
};