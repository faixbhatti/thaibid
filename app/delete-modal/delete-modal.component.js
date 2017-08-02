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

function deleteModal($rootScope) {
    return {
        open,
        removeItem,
        index: 0,
        list: [],
        endDate: 0
    };


    ////////////////
    function open(index, list) {
        this.index = index;
        this.list = list;
        $('#delete-modal').modal('open');
    }

    function setEndDate(date) {
        return new Date(date.setDate(date.getDate() + 1)); //Set the next day as expiry date of user cookie
    }

    function removeItem() {
        this.list.splice(this.index, 1);
        $rootScope.hasDeleted = true;
        let date = new Date()
        this.endDate = setEndDate(date)
        console.log(this.endDate)
        Materialize.toast('Item removed from cart', 1000)
    }

}


function deleteFromCartCtrl(deleteModal, $rootScope) {
    const ctrl = this;
    ctrl.hasDeleted = $rootScope.hasDeleted

    $rootScope.$watch('hasDeleted', function(newValue, oldValue, scope) {
        ctrl.hasDeleted = newValue;
    }, true);

    ctrl.removeItem = function() {
        deleteModal.removeItem();
    };


    ctrl.deleteModal = deleteModal;
    ////////////////

}