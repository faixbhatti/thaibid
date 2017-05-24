(function() {
    'use strict';

    var app = angular.module('thai')

    app.factory('deleteModal', deleteModal);

    function deleteModal($rootScope) {
        var modal = {
            open: open,
            delete: remove,
            index: 0,
            list: []
        };

        return modal;

        ////////////////
        function open(index, list) {
            this.index = index;
            this.list = list;
            $('#delete-modal').modal('open');
        }

        function remove() {
            this.list.splice(this.index, 1)
            Materialize.toast('Item removed from cart', 1000)
        }
    }
})();