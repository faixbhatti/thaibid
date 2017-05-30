    'use strict';

    angular.module('thai')
        .factory('deleteModal', deleteModal);

    function deleteModal($rootScope) {
        var modal = {
            open: open,
            eject: eject,
            index: 0,
            list: []
        };

        return modal;

        ////////////////
        function open(index, list) {
            console.log('done')
            this.index = index;
            this.list = list;
            $('#delete-modal').modal('open');
        }

        function eject() {
            console.log(this.list)
            $rootScope.cart.splice(this.index, 1)
            Materialize.toast('Item removed from cart', 1000)
        }
    }