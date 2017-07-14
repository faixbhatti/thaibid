    'use strict';

    // Usage:
    // 
    // Creates:
    // 
    angular.module('thai')
        .component('detailTabs', {
            templateUrl: 'app/product-detail/tabs/tabs.html',
            controller: tabsCtrl,
            bindings: {
                bids: '<',
                product: '<'
            },
        });

    function tabsCtrl($rootScope, $scope, Review) {
        var ctrl = this,
            stars;

        ctrl.loggedIn = $rootScope.loggedIn;

        $scope.$watch('$root.loggedIn', function(oldValue, newValue) {
            ctrl.loggedIn = $rootScope.loggedIn;
        })

        ctrl.logIn = function() {
            $('#login-modal').modal('open');
        }

        ctrl.reviews = [{
                "image": "/image/elliot.jpg",
                "user": "Mark Phillips",
                "date": "2017-02-12",
                "text": "Really happy with this print. The colors are great, and the paper quality is good too.",
                "stars": 3

            },
            {
                "image": "/image/daniel.jpg",
                "user": "John Peters",
                "date": "2017-02-22",
                "text": "This is a fantastic quality print and is happily hanging framed on my wall now.",
                "stars": 5

            },
            {
                "image": "/image/helen.jpg",
                "user": "Afro Richard",
                "date": "2017-01-31",
                "text": "You only get the picture, not the person holding it, something they don’t mention in the description, now I’ve got to find my own person",
                "stars": 3

            },
            {
                "image": "/image/elyse.png",
                "user": "Peter Orok",
                "date": "2017-03-24",
                "text": "This is my favorite poster. In fact, I’ve ordered 5 of them!",
                "stars": 4
            }
        ]

        ctrl.addreview = function() {
            var review = {
                "image": "/image/matthew.png",
                "user": $rootScope.username,
                "date": new Date(),
                "text": ctrl.review.text,
            }
            Review.addReview(review, ctrl)
        }

        ctrl.$onInit = () => {
            Review.init();
            $('.tabs').tabs();

            (function hideBidsTab(){
                if(ctrl.product.is_redeemable){
                    $('.tabs').tabs('select_tab', 'prod-detail')
                }
            })()
        }

    }