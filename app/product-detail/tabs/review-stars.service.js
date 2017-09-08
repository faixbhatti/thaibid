    'use strict';

    angular.module('thai')
        .factory('Review', Review)
        .directive('initStar', function(Review) {
            return function(scope, element, attrs) {
                Review.init();
            }
        })

    function Review(httpService, $user) {
        var review = {
            clearStars,
            init,
            addReview,
            clickedStar: 0,
            clicked: false
        };

        return review;

        function addReview(review, ctrl) {
            ctrl.loading = true;
            var stars = document.querySelectorAll('.stars');
            let user = $user.getUser();
            review.ratings = this.clickedStar;
            if (review.ratings < 1) {
                Materialize.toast('Please rate this product. Click a star!', 3000)
            } else {
                httpService
                    .postUserDetails('product_ratings', user, review, 'post')
                    .then(res => {
                        let data = res.data;
                        if (data.meta.code === 200) {
                            Materialize.toast(`${data.meta.message}`, 3000)
                            ctrl.ratings.push(rating);
                            ctrl.review = {};
                            this.clearStars(stars)
                            ctrl.loading = false;
                        }
                    }, () => {
                        ctrl.loading = false;
                        Materialize.toast('An error occured', 3000)
                    })

            }
        }

        function init() {
            var stars = document.querySelectorAll('.stars'),
                obj = this;

            stars.forEach(function(star) {
                star.addEventListener('mouseover', showStars)
                star.addEventListener('mouseout', clearStars)
                star.addEventListener('click', addStar)
            })

            function showStars() {
                var value = this.dataset.value;

                for (var i = 0; i < value; i++) {
                    var star = stars[i]
                    if (obj.clicked) {
                        if (i > obj.clickedStar - 1) {
                            star.classList.remove('grey-text')
                            star.classList.add('teal-text')
                        }
                    } else {
                        var star = stars[i]
                        star.classList.remove('grey-text')
                        star.classList.add('teal-text')
                    }
                }
            }

            function addStar(star) {
                var value = this.dataset.value;
                obj.clearStars(stars)

                for (var i = 0; i < value; i++) {
                    var star = stars[i]
                    star.classList.remove('grey-text')
                    star.classList.add('teal-text')
                }
                obj.clicked = true;
                obj.clickedStar = value;
            }


            function clearStars() {
                var value = this.dataset.value;

                for (var i = 0; i < value; i++) {
                    var star = stars[i]
                    if (obj.clicked) {
                        if (i > obj.clickedStar - 1) {
                            star.classList.remove('teal-text')
                            star.classList.add('grey-text')
                        }
                    } else {
                        star.classList.remove('teal-text')
                        star.classList.add('grey-text')
                    }
                }
            }

        }

        function clearStars(stars) {
            for (var i = 0; i < stars.length; i++) {
                var star = stars[i]
                star.classList.remove('teal-text')
                star.classList.add('grey-text')
            }
            this.clicked = false;
            this.clickedStar = 0;
        }

        ////////////////
        function exposedFn() {}
    }