/**
 * Created by Afro on 3/24/2017.
 */
'use strict';

angular.module('thai')
    .controller('navCtrl', function($scope, $location, $rootScope, $filter, products, deleteModal) {



        $rootScope.showNav = true;
        $rootScope.previousPage = "/home"
        $rootScope.cart = []
        $rootScope.inCart = false;
        $rootScope.inDetail = false;
        $rootScope.template = 'auctions'

        if (window.innerWidth < 993) {
            $rootScope.inMobile = true;
        } else {
            $rootScope.inMobile = false;
        }

        $rootScope.loggedIn = false;

        $rootScope.username = "";



        $(document).ready(function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })


    })