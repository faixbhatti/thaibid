'use strict';

// Usage:
//
// Creates:
//
angular.module('thai')
    .factory('deleteModal', deleteModal)
    .component('deleteFromCartModal', {
        templateUrl: 'app/delete-modal/delete-modal.html',
        controller: deleteFromCartCtrl,
    });

function deleteModal() {
    return {
        open,
        removeItem,
        index: 0,
        list: []
    };


    ////////////////
    function open(index, list) {
        this.index = index;
        this.list = list;
        $('#delete-modal').modal('open');
    }

    function removeItem() {
        console.log('deleting');
        this.list.splice(this.index, 1);
        Materialize.toast('Item removed from cart', 1000)
    }
}


function deleteFromCartCtrl(deleteModal) {
    const ctrl = this;

    ctrl.clean = function () {
        alert('why')
    };

    ctrl.removeItem = function () {
        console.log('time');
        deleteModal.removeItem();
    };
    ////////////////

}