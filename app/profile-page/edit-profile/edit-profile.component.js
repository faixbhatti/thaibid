/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userEditProfile', {
        templateUrl: 'app/profile-page/edit-profile/edit-profile.html',
        controller: editCtrl,
        require: {
            profile: '^userProfile'
        }
    });

function editCtrl($http, $user, httpService, Upload, $rootScope) {
    var ctrl = this;
    ctrl.user = $user.getUser();
    ctrl.profileImage = '';
    const headers = {
        "xapi": "jwZryAdcrffggf867DnjhjhfRvsfhjs5667",
        "Id": `${ctrl.user.um_id}`,
        "Accesstoken": `${ctrl.user.access_token}`
    }

    ctrl.saveProfile = () => {
        let userData = {};
        userData.first_name = ctrl.user.um_fname;
        userData.last_name = ctrl.user.um_lname;
        userData.address = ctrl.user.um_address;
        userData.country = ctrl.user.um_country;
        userData.state = ctrl.user.um_state;
        userData.city = ctrl.user.um_city;
        userData.sub_district = ctrl.user.sub_district;
        userData.language = ctrl.user.um_language;
        userData.mobile = ctrl.user.um_mobile;

        httpService
            .postUserDetails('edit-profile', ctrl.user, userData, 'post')
            .then(data => {
                let vData = httpService.verifyData(data.data)
                if (vData) {
                    ctrl.user.um_fname = userData.first_name;
                    ctrl.user.um_lname = userData.last_name;
                    ctrl.user.um_address = userData.address;
                    ctrl.user.um_country = userData.country;
                    ctrl.user.um_state = userData.state;
                    ctrl.user.um_city = userData.city;
                    ctrl.user.sub_district = userData.sub_district;
                    ctrl.user.um_language = userData.language;
                    ctrl.user.um_mobile = userData.mobile;
                    $user.setUser(ctrl.user);
                    ctrl.user = $user.getUser();
                    Materialize.toast('Profile updated successfully', 3000);
                } else {
                    Materialize.toast('Error completing request', 3000);
                }
            })
    };

    ctrl.uploadImage = () => {
        if (ctrl.profileImage) {
            Upload.upload({
                    url: 'https://officeadm1n.bidxel.com/api/edit-profile-pic',
                    data: { profile_pic: ctrl.profileImage },
                    method: 'POST',
                    headers: headers,
                })
                .then(
                    res => {
                        let user = httpService.verifyData(res.data);
                        if (user) {
                            ctrl.user.profile_image_large = user.profile_image_large;
                            ctrl.user.profile_image_small = user.profile_image_small;
                            $user.setUser(ctrl.user);
                            ctrl.user = $user.getUser();
                            $rootScope.$broadcast('loggedIn');
                            Materialize.toast('Profile Image uploaded successfully', 3000);
                        } else {
                            Materialize.toast('Error uploading image', 3000)
                        }
                    },
                    () => {
                        Materialize.toast('Error uploading image', 3000)
                    },
                    (evt) => {
                        ctrl.profileImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total))
                    }
                )
        }

    }
    ctrl.goBack = (location) => {
        ctrl.profile.switchTab(location);
    };


    $(document).ready(function name(params) {
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
                limit: 45,
                minLength: 1
            })
            Materialize.updateTextFields();

        });
    })



};