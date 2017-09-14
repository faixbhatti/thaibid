/**
 * Created by Afro on 6/19/2017.
 */

'use strict';

angular.module('thai')
    .component('userOrders', {
        require: {
            userProfile: '^userProfile'
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


function orderCtrl($mdDialog, $user, httpService) {
    const ctrl = this;
    ctrl.loading = true;
    ctrl.search = false;
    ctrl.cancelled = false;
    ctrl.user = $user.getUser();

    ctrl.query = {
        'order': 'name',
        limit: 5,
        page: 1,
        filter: ''
    };

    ctrl.showInvoice = (invoice) => {
        ctrl.userProfile.showInvoice(invoice);
    };

    function get(abUrl, userInfo, page) {
        ctrl.promise = httpService
            .getUserDetails(abUrl, userInfo, page)
            .then(res => {
                let fectched = res.data;
                if (fectched.data) {
                    let metaData = fectched.data;
                    ctrl.orders = metaData.data;
                    ctrl.query.total = metaData.total;
                    ctrl.query.page = metaData.current_page;
                }
            })
    }
    get('order', ctrl.user)

    ctrl.showReviewPrompt = function(order, ev) {
        let header = document.querySelector('.navbar-fixed');
        header.style.zIndex = 76;

        //Create an alert dialog if the user has rated the product to show user comment
        var confirm = !!order.comment ? $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('This is what you had to say about this product')
            .textContent(order.comment)
            .ariaLabel('Product rating')
            .ok('Got it!')
            .targetEvent(ev)

        :
        //Else show the user a prompt to enter his comment and rating
        $mdDialog.prompt()
            .title('How do you think about the quality of your product?')
            .placeholder('Enter your comment...')
            .ariaLabel('Enter your comment')
            .initialValue(!!order.comment ? order.comment : '')
            .targetEvent(ev)
            .ok('Submit')
            .cancel('Cancel')

        setTimeout(() => {
            $mdDialog.show(confirm).then(function(result) {
                order.comment = result
                header.style.zIndex = 1000;
            }, function() {
                header.style.zIndex = 1000;
            });
        }, 400);
    };

    ctrl.cancelOrder = function(ev, order) {
        let header = document.querySelector('.navbar-fixed');
        header.style.zIndex = 76;
        // Appending dialog to document.body to cover sidenav in docs app
        setTimeout(() => {
            var cancel = $mdDialog.confirm()
                .title('Are you sure you want to cancel this order?')
                .textContent('Please make sure you don\'t cancel more than 3 times in 90 days.')
                .ariaLabel('Cancel Order')
                .targetEvent(ev)
                .ok('Go ahead!')
                .cancel('Don\'t Cancel');

            $mdDialog.show(cancel).then(function() {
                let complaint = {};
                complaint.order_item_id = order.order_id;
                complaint.message = 'Cancelling order of item';
                httpService
                    .postUserDetails('order_cancel', ctrl.user, complaint, 'put')
                    .then(res => {
                        let response = httpService.verifyData(res.data);
                        if (response) {
                            console.log(response);
                            Materialize.toast('Order cancelled successfully', 2000);
                        } else {
                            Materialize.toast('Error completing request', 2000);
                        }
                    })
                header.style.zIndex = 1000;

            }, function() {
                header.style.zIndex = 1000;
            });
        }, 400)
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
            }).then(() => {
                header.style.zIndex = 1000;

            }, () => {
                header.style.zIndex = 1000;
            })
        }, 200)

    }

    ctrl.selected = [];

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

    ctrl.getOrders = (page) => {
        get('order', ctrl.user, page)
    }

    ctrl.logItem = (item) => {}

    ctrl.$onInit = () => {
        ctrl.loading = false;
    }
}