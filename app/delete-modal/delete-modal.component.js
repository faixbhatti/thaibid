    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('deleteModal', {
            templateUrl: 'app/delete-modal/delete-modal.html',
            controller: modalCtrl,
        });

    modalCtrl.inject = ['deleteModal'];

    function modalCtrl(deleteModal) {
        var ctrl = this;

        ctrl.clean = function() {
            alert('why')
        }

        ctrl.shake = function() {
            console.log('time')
            deleteModal.eject();
        };
        ////////////////

    }