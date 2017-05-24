(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    var app = angular.module('thai');
    app.component('deleteModal', {
        templateUrl: 'app/delete-modal/delete-modal.html',
        controller: modalCtrl,
    });

    function modalCtrl(deleteModal) {
        var ctrl = this;

        ctrl.removeItem = function() {
                deleteModal.delete()
            }
            ////////////////

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();