/**
 * Created by Afro on 3/23/2017.
 */
'use strict';
angular.module('thai')
    .component('productDetail', {
        templateUrl: 'app/product-detail/product-detail.html',
        controller: detailCtrl
    })


function detailCtrl($scope, $routeParams, $rootScope, $misc, ngMeta, httpService, $user, $filter) {
    var ctrl = this;
    $scope.loading = true;
    $scope.showDiv = false;
    $scope.newBid = false;
    $scope.nextBid = 0;
    $rootScope.showNav = true;
    $rootScope.inCart = false;
    $rootScope.previousPage = `/product/${$routeParams.productId}`;
    $scope.active = 0;
    $scope.clicked = 1;
    $scope.selected = 1;
    $scope.cart = $rootScope.cart;
    $scope.loggedIn = $user.isAuthenticated();
    $scope.bids = [];
    let numFilter = $filter('number');
    let auctionCaller;
    let user;
    if ($user.getUser()) {
        user = $scope.user = $user.getUser();
    }

    ctrl.bidInfo = {
        bidAmount: 0
    };
    let input = document.querySelector('#amount');
    ctrl.observed = false;
    ctrl.spinnerPosition = 'absolute';

    $scope.$watch('$root.cart', function(oldValue, newValue, scope) {
        $scope.cart = $rootScope.cart;
    }, true);

    function get() {
        let id = $routeParams.productId;
        httpService.get(`product/${id}`).then(function(data) {
            let product = data.data.data;
            $scope.product = ctrl.product = product;
            ctrl.remaining_time = $scope.product.auctions.remaining_time;
            ctrl.productId = $scope.product.productId;
            ctrl.auctionId = $scope.product.auctions.auctionId;
            $scope.maxBid = ctrl.maxBid = getNextbid(0)
            $scope.nextBid = getNextbid($scope.maxBid)
            ctrl.bidInfo.bidAmount = $scope.nextBid;
            let title = $misc.capitalizeText($scope.product.product_title);
            ngMeta.setTitle(`${title}`, ' | Bidxel.com');
            $scope.imgs = $scope.product.images;
            $scope.productImage = $scope.imgs[0];
            $scope.sizes = $scope.product.sizes;
            $scope.colors = $scope.product.colors;
            $scope.ratings = $scope.product.ratings;
            $scope.relatedProducts = $scope.product.related_products;
            $scope.loading = false;
            ctrl.getAuctionDetails()
                // auctionCaller = setAuctionInterval();
        });
        $scope.page = 1;
    }

    get();

    function setAuctionInterval() {
        if (!$scope.product.redeemable) {
            return setInterval(() => {
                ctrl.getAuctionDetails()
            }, 2000);
        }
    }

    ctrl.getAuctionDetails = function() {
        let auctionData = {
            auctionId: $scope.product.auctions.auctionId,
            productId: $scope.product.productId
        };
        httpService
            .postUserDetails('bidder', user, auctionData, 'patch')
            .then(data => {
                let res = data.data;
                if (res.meta.code === 200) {
                    if (res.data) {
                        let bids = res.data;
                        $scope.bids = [...bids];
                        $scope.currentWinner = bids[0].user_name;
                        $scope.maxBid = ctrl.maxBid = bids[0].bid_amount;
                        $scope.nextBid = getNextbid($scope.maxBid);
                        ctrl.bidInfo.bidAmount = $scope.nextBid;
                    } else {
                        $scope.maxBid = 0
                        $scope.nextBid = getNextbid($scope.maxBid)
                    }
                }
            })
    }

    function getNextbid(amount) {
        if (amount < 1) {
            return amount + 10
        }
        let numPercent = (30 / 100) * amount;
        return Math.floor(amount + numPercent);
    }

    $scope.slideRight = () => {
        $scope.page = 2;
    };

    $scope.slideOut = function() {
        $scope.page = 1;
    };

    //Show or hide cart button depending on screen size
    function showCart() {
        $rootScope.inDetail = window.matchMedia('(min-width: 601px)').matches
    }

    showCart();

    $rootScope.$on('loggedIn', checkAuthStatus)
    $rootScope.$on('loggedOut', checkAuthStatus)
    $rootScope.$on('auction-ended', restartAuction)

    function restartAuction() {
        $scope.bids = [];
        $scope.maxBid = 0
        $scope.nextBid = getNextbid($scope.maxBid);
        ctrl.bidInfo.bidAmount = $scope.nextBid;
        ctrl.auctionEnded = true;
        setTimeout(() => ctrl.auctionEnded = false, 4000);
        get()
    }

    function checkAuthStatus() {
        $scope.loggedIn = $user.isAuthenticated();
        user = $scope.user = $user.getUser();
    };

    //Scroll to bid history position on window
    $scope.bidHistory = function() {
        let bids = document.querySelector('#prod-info'),
            top = bids.offsetTop;
        $('.tabs').tabs('select_tab', 'prod-bids');
        document.body.scrollTop = top;
        document.documentElement.scrollTop = top;
    }


    //When in mobile view, if user clicks on bid button, display amount input field
    $scope.placeBid = function(product) {
            if (input.classList.contains('show-bid')) {
                $scope.addToCart(product); //If input field is visible then add to cart
                input.classList.remove('show-bid');
                $scope.hideCart = false;
            } else {
                $scope.hideCart = true;
                input.classList.add('show-bid'); //Else display amount input field
                $('#amount').focus() //Focus on input field
                Materialize.toast('Please input a bid amount', 1000);
            }
        }
        //Display cart sidebar
    $scope.showCart = function() {
        $('.cart-button').sideNav('show');
    }

    function showNewBid() {
        ctrl.newBid = true;
        setTimeout(() => ctrl.newBid = false, 4000);
    }

    $scope.bid = () => {
        if ($scope.loggedIn) {

            if (($scope.colors.length && $scope.sizes.length && ctrl.bidInfo.productColor && ctrl.bidInfo.productSize) || (!$scope.colors.length && !$scope.size.length)) {
                let bid = {
                    auctionId: $scope.product.auctions.auctionId,
                    productId: $scope.product.productId,
                    BidAmount: ctrl.bidInfo.bidAmount
                }
                httpService
                    .postUserDetails('bidder', user, bid, 'post')
                    .then((data) => {
                        let res = httpService.verifyData(data.data);
                        if (res) {
                            ctrl.getAuctionDetails();
                            showNewBid();
                            // If window size is mobile or tablet, call the navigator.vibrate() api.
                            if (navigator.vibrate) {
                                navigator.vibrate(200)
                            }
                        }
                    }, err => {
                        Materialize.toast('An error occured', 3000)
                    })
            } else {
                Materialize.toast('Please select color and size of product before bidding', 4000)
            }
        } else {
            // Open login modal if user isn't logged in
            $('#login-modal').modal('open');
            Materialize.toast('Please log in or sign up before bidding', 3000)
        }
    }

    $scope.addToCart = function(product) {
            if ($rootScope.loggedIn) {
                // If window size is mobile or tablet, call the navigator.vibrate() api.
                if (navigator.vibrate) {
                    navigator.vibrate(200)
                }
                if (window.innerWidth < 993) {
                    Materialize.toast('Item added to cart', 1000); //Display toast when item is added to cart
                    $misc.shake(); //shake to cart button
                } else {
                    Materialize.toast('Item added to cart', 1000)
                }
                $rootScope.cart.push(product);
            } else {
                // Open login modal if user isn't logged in
                $('#login-modal').modal('open');
                Materialize.toast('Please log in or sign up', 1000)
            }

        }
        //Change images in gallery
    $scope.chgSrc = function(img, index) {
        $scope.productImage = img;
        $scope.active = index
    };

    $(document).ready(function() {
        // ELement Initialisation
        $('.materialboxed').materialbox();
        $('select').material_select();
        $('ul.tabs').tabs();
        $('.tooltipped').tooltip({
            delay: 50
        });
        setTimeout(() => {
            Materialize.updateTextFields();
        }, 4000);
        // Scroll to top when page is loaded
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    })
    ctrl.$onDestroy = function() {
        window.clearInterval(auctionCaller)
    }
};