/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userOrders', {
        require: {
            user: '^userProfile'
        },
        templateUrl: 'app/profile-page/orders/orders.html',
        controller: orderCtrl,

    })
    .controller('addItemController', function($mdDialog, $scope, $mdToast) {


        $scope.hide = () => {
            let header = document.querySelector('.navbar-fixed');
            header.style.zIndex = 997;
            $mdDialog.hide();
        };



        $scope.submitComplaint = () => {
            $scope.hide();
            $mdToast.show(
                $mdToast.simple()
                .textContent('Your complaint has been submitted. Awaiting confirmation')
                .position("bottom")
                .hideDelay(3000)
            );

        };

    });


function orderCtrl($mdDialog) {
    const ctrl = this;
    ctrl.loading = true;
    ctrl.search = false;

    ctrl.showInvoice = (invoice) => {
        ctrl.user.showInvoice(invoice);
    };

    ctrl.showReviewPrompt = function(order, ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('How do you think about the quality of your product?')
            .placeholder('Enter your comment...')
            .ariaLabel('Enter your comment')
            .initialValue(!!order.comment ? order.comment : '')
            .targetEvent(ev)
            .ok('Submit')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            order.comment = result
        }, function() {});
    };

    ctrl.raiseIssue = (event) => {
        let header = document.querySelector('.navbar-fixed');
        header.style.zIndex = 76;
        setTimeout(() => {
            $mdDialog.show({
                clickOutsideToClose: false,
                controller: 'addItemController',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'app/profile-page/orders/order-dialog.html',
            })
        }, 200)

    }

    ctrl.selected = [];

    ctrl.query = {
        'order': 'name',
        limit: 10,
        page: 1,
        filter: ''
    }

    ctrl.removeFilter = () => {
        ctrl.query.filter = ''
        ctrl.search = false;
    }

    ctrl.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    ctrl.getOrders = (item) => {
        console.log(item, 'was ordered')
    }

    ctrl.logItem = (item) => {
        console.log(item, 'was clicked')
    }

    ctrl.$onInit = () => {
        ctrl.orders = ctrl.user.orders;
        ctrl.loading = false;
    }
}