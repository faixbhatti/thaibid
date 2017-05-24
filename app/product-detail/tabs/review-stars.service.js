(function() {
    'use strict';

    var app = angular.module('thai')

    app.factory('Review', Review);

    function Review() {
        var review = {
            clearStars: clearStars,
            init: init,
            addReview: addReview,
            clickedStar: 0,
            clicked: false
        };

        return review;

        function addReview(review, ctrl) {
            var stars = document.querySelectorAll('.stars');
            review.stars = this.clickedStar;
            if (review.stars < 1) {
                Materialize.toast('Please rate this product. Click a star!', 1000)
            } else {
                ctrl.reviews.push(review);
                Materialize.toast('Thank you for reviewing this product!', 1000)
                ctrl.review = {};
                this.clearStars(stars)
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
})();