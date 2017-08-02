/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/Icons/2co.png","4e1f79bc1b0b3007eeec08a1b4c5d0d3"],["/Icons/american-express.png","fc909cb2454e38212b121841211a8a9b"],["/Icons/icon128.png","ad085a8c634d6f8f6134ee0072772232"],["/Icons/icon144.png","5520c0e3ac4ab19e2c83dcba36981b01"],["/Icons/icon192.png","9b2546b2b5ef6a8710ba3fe4312d7d45"],["/Icons/icon256.png","1ab744c2faef1838dce3db42a731eb49"],["/Icons/icon348.png","e2a90531800793e6acae513065d60314"],["/Icons/icon48.png","36bac73024578697f31c9d492e90a657"],["/Icons/icon512.png","39299873e7d5efb92b6435be405a0e80"],["/Icons/icon92.png","ce657da63dcccd554dda596c20f0f52a"],["/Icons/mastercard.png","876f2e138a777d46de3c68ddbc153ce5"],["/Icons/moneygram.png","a1704d1495cd821d7290bd7a52d8cf3c"],["/Icons/paypal.png","b9533bd33b23e76a999a03c21bca2729"],["/Icons/picknplay.png","1a90b3012391b12785e8bc8b2255f44e"],["/Icons/visa.png","e7dcd9004ed4491040a48fd400edd38b"],["/Icons/western-union.png","55aed89af1f884037d52e61a1c2bd1e7"],["/app/about-us/about.html","8d9fa15e2d9dac9f2bca67595fcfaf86"],["/app/add-to-homescreen/add-homescreen.html","8e23d6a75c68b8015a84fee1c5f313c0"],["/app/advanced-search-sidebar/search-sidebar.html","d9218cf9b22dc87dc523b198d0d09d1e"],["/app/app.component.html","1bcc6621e5f3a50a9dc55652263562e7"],["/app/assurances/assurance.html","ed9a8b8cba33ea3ca63a5b0b237e5e24"],["/app/categories/categories.html","784ec4deba91e056ff365265c296aff9"],["/app/checkout/billing.html","65e07b3b1627d0f09ce05dda403551b0"],["/app/checkout/checkout.html","4bfa7d27be850bbfa03ae442c8fa00bb"],["/app/checkout/delivery.html","544111733bc81a9a6ebeed58093a7161"],["/app/checkout/order.html","2fc07a05c68e66c116bb99a3a8385055"],["/app/checkout/step.html","4b7247399e074467a7264d794c13c9d3"],["/app/delete-modal/delete-modal.html","d7f637d80513a2ec375a3b24ea191de0"],["/app/footer/footer.html","0dbe8d494fa42221d50c9295922a7717"],["/app/home/home.html","c7b395386e5000edf11e4030a3796d74"],["/app/login/login.html","b3359c06a2f51c40f6fdc5a57940c6e2"],["/app/privacy-policy/privacy.html","79a4ae04c0db9749c7d38ba473bba1e9"],["/app/product-category/product-category.html","997a3cd89ab731c62f76a3f6ee4eb937"],["/app/product-detail/bid-table/bid-table.html","a6a54b3d9bdf4de8d2d41619cade194a"],["/app/product-detail/countdown-timer/countdown-timer.html","b3b7cf5512ac6f496acca03b584f942b"],["/app/product-detail/product-detail.html","cb2ea58d984125074cb64758b88c24b4"],["/app/product-detail/tabs/tabs.html","dde647c196f28d1fa4f1401f1b0d1cac"],["/app/products.json","cdb3d29aa8f9fbea6ddb49991551599b"],["/app/products/product-list.html","843b3e4bcbd20df4da2dea9f8745893d"],["/app/profile-page/auctions/auctions.html","a90e365ca52f679ba6ba8901457dfd46"],["/app/profile-page/cart/cart.html","168eb5c0eca104aa9220e37be5188c83"],["/app/profile-page/edit-profile/edit-profile.html","cb1bd3e705e728a4357adc82177a8aa5"],["/app/profile-page/invoice-modal/invoice-modal.html","e6821c51266403c4ef7a54fe6e8c1dbc"],["/app/profile-page/modal/purchase-modal.html","ae065aeff704b952d1d17686ab7b067a"],["/app/profile-page/orders/order-dialog.html","cc7e0dbc96e337d339474cb5c7720524"],["/app/profile-page/orders/orders.html","8c3d3bef24ed681366f650e2c59790ba"],["/app/profile-page/profile-page.html","3eb30f3a4bbdfaecec372deebf8b0f1b"],["/app/profile-page/purchases.html","28d21f897755599cbf9ebd765b6fea1b"],["/app/profile-page/rewards/rewards.html","797c874cffadbe5fc6116a8feab27ba4"],["/app/redeem-shop/product-list/redeem-products.html","5a27cab6200cc805bd3df38bcc0882f2"],["/app/redeem-shop/redeem-shop.html","e2aac95d9250c7c5c6cd2b5338c431f4"],["/app/redeem-shop/user-details-sidebar/user-sidebar.html","8ab85f1f43c5865cf40071c10ccc8f1f"],["/app/search-area/search-area.html","3d5054cd31a1c4f3217b4cd5a4e5be61"],["/app/side-cart/side-cart.html","149097aefbd8651cbdfcce0ce6831ad0"],["/app/side-nav/side-nav.html","c3bd714c11c11cc0ab21767ca3e878bf"],["/app/spinner/spinner.html","7e778b1856d16892759aacc0817f9e63"],["/app/terms-and-conditions/terms.html","f62ddffc7711a07c071240f37ea1f29f"],["/dist/css/app.min.css","fbc186ad8f1b25988bbb6e30767b47fb"],["/dist/css/materialize.min.css","68d5a81cc0b3468b9647c66e81879c98"],["/dist/fonts/roboto/Roboto-Bold.eot","ecdd509cadbf1ea78b8d2e31ec52328c"],["/dist/fonts/roboto/Roboto-Bold.ttf","e31fcf1885e371e19f5786c2bdfeae1b"],["/dist/fonts/roboto/Roboto-Bold.woff","dc81817def276b4f21395f7ea5e88dcd"],["/dist/fonts/roboto/Roboto-Bold.woff2","39b2c3031be6b4ea96e2e3e95d307814"],["/dist/fonts/roboto/Roboto-Light.eot","a990f611f2305dc12965f186c2ef2690"],["/dist/fonts/roboto/Roboto-Light.ttf","46e48ce0628835f68a7369d0254e4283"],["/dist/fonts/roboto/Roboto-Light.woff","3b813c2ae0d04909a33a18d792912ee7"],["/dist/fonts/roboto/Roboto-Light.woff2","69f8a0617ac472f78e45841323a3df9e"],["/dist/fonts/roboto/Roboto-Medium.eot","4d9f3f9e5195e7b074bb63ba4ce42208"],["/dist/fonts/roboto/Roboto-Medium.ttf","894a2ede85a483bf9bedefd4db45cdb9"],["/dist/fonts/roboto/Roboto-Medium.woff","fc78759e93a6cac50458610e3d9d63a0"],["/dist/fonts/roboto/Roboto-Medium.woff2","574fd0b50367f886d359e8264938fc37"],["/dist/fonts/roboto/Roboto-Regular.eot","30799efa5bf74129468ad4e257551dc3"],["/dist/fonts/roboto/Roboto-Regular.ttf","df7b648ce5356ea1ebce435b3459fd60"],["/dist/fonts/roboto/Roboto-Regular.woff","ba3dcd8903e3d0af5de7792777f8ae0d"],["/dist/fonts/roboto/Roboto-Regular.woff2","2751ee43015f9884c3642f103b7f70c9"],["/dist/fonts/roboto/Roboto-Thin.eot","dfe56a876d0282555d1e2458e278060f"],["/dist/fonts/roboto/Roboto-Thin.ttf","94998475f6aea65f558494802416c1cf"],["/dist/fonts/roboto/Roboto-Thin.woff","7500519de3d82e33d1587f8042e2afcb"],["/dist/fonts/roboto/Roboto-Thin.woff2","954bbdeb86483e4ffea00c4591530ece"],["/dist/js/app.bundle.min.js","e11e59e15fd3fa4e8779d0b12197357d"],["/dist/js/vendors/vendors.bundle.min.js","33099f6fbd0303bd028309b975003133"],["/image/BidXelSVG.svg","ca840d5589153125874f8b00579a3764"],["/image/daniel.jpg","9d7d6e9f6d4db1e42da9e627d6b22921"],["/image/elliot.jpg","0a26948090d925bdbae7b7673ce00998"],["/image/elyse.jpg","f41b67dbd216c8898b4223dc35bacac3"],["/image/glasses.jpg","7445230c26ce4be3ca873bede2751b00"],["/image/header-bg.png","3ce53d54d3c9533255b9f66020c377dd"],["/image/helen.jpg","2541fd2c06d7237999c168b6bc53f078"],["/image/ladies-and-gentlemen.jpg","80827e53ce8eea437e25d3159514163c"],["/image/ladies__blue-dress.jpeg","eeb0ea08f364d46d1b9fc516bd1bfbdd"],["/image/ladies__canvas.jpeg","78b627bc25e60b6ff35c7b30dcaf3538"],["/image/ladies__collection.jpg","d664ba1251e26731efa46576741e8a31"],["/image/ladies__crop-top.jpeg","09121ce1d68b3254e1e907045231e180"],["/image/ladies__dancing-shoes.jpeg","4fe0cd9e5a4242ea4e5ab353fcecc2e8"],["/image/ladies__flats.jpeg","ca18a17f9ecee3fa2f91c557859fc606"],["/image/ladies__red-heels.jpeg","d10ce14fd0429a8c0a4aa57d2f1fca9c"],["/image/ladies__runway.jpeg","fa335201e4eba0ceed30e152a82af6ae"],["/image/ladies__shoes.jpeg","30b77c3092d3c35fab73df70d8d0a792"],["/image/ladies__shopping-bags.jpeg","2c4188c9ad2a26a968f048666025ae3f"],["/image/ladies__shopping.jpeg","e1d6f4505e869c32cc69a75558f27aac"],["/image/ladies__sneakers.jpg","960db44f73a4e5081156c4838002345d"],["/image/ladies__sparkles.jpeg","03ab30cad0b06dacbf2507e2ab0036c3"],["/image/ladies__wedding-wear.jpeg","61feb7a04faea5c58fb4c398ec69b2b7"],["/image/ladies__yeezys.jpeg","2bf8e4e837ae6c119e02b51e4ad47e03"],["/image/ladies__yellow-shoes.jpg","070c26daae45d327fd3f6626bc6e0bfb"],["/image/leather-bag.jpg","adee3f62488a1f0cc689ac7f55080bdd"],["/image/matthew.jpg","d94e4d68f0ede57a79ee26f937c3fcfd"],["/image/men__all-stars.jpeg","bf8005fd395c649b2d501521ff8e5703"],["/image/men__bag.jpeg","8942357a7d3c3553252e770b413077ba"],["/image/men__beach-shades.jpeg","16f225027e9bd466126137cf10c5d8d8"],["/image/men__black-converse.jpeg","bf70dd9f995abc47bfeb68e6a43fefaa"],["/image/men__black-nikes.jpeg","15645c4580e4ed446f33319bea8f46a4"],["/image/men__blue-sneakers.jpeg","cf9601a9c3ccd984f7030420f3c33943"],["/image/men__brown-leather.jpg","ccd3297a30f369ad77f8b92c5fe8ebbe"],["/image/men__dirty-shoes.jpeg","e3ef144ecb9c2476fc0e37f03f0cae9a"],["/image/men__dress-shoes.jpg","e2fef8e608941140d6a12a8e31936009"],["/image/men__fresh-boots.jpeg","4cde9d9080563061e769aa63d1be263f"],["/image/men__fresh-nicks.jpeg","20b8ae6f22a2ecc2bb35964da92406df"],["/image/men__leather-casual.jpg","8c9d3a11bb82598a5ba79d6aec99c60d"],["/image/men__mad-shades.jpeg","40386958e720df2e8d17ce36762dbc07"],["/image/men__mad-shirt.jpeg","b0496c5a60a0b7baa639969537e21a25"],["/image/men__polka-dot.jpeg","d2082a291ce54e0c29a9816a2df19793"],["/image/men__ripped-sneakers.jpg","eefe87ac996d03a3a63d94bbb5f67fe2"],["/image/men__shoe-jean.jpeg","ceb029dfc65eee76e1167fb47e459ad2"],["/image/men__ties.jpeg","8070ab8289257d080a5110a34ef9bd21"],["/image/men__tu-pac.jpg","4384ba37e1f03a6edfbcdbc72fccae55"],["/image/newsletter.jpg","8d66d07c3b15e2fa31f520c08c27b820"],["/image/pattern.jpg","844ee0b46d8c6d0381a0bb60f8930855"],["/image/pocket.jpg","b30609f797fc04cfe7e299c1b24566a1"],["/image/shirt.jpg","548dbdccf03fc568de3aca244485103e"],["/image/sky.jpg","4b06a47cc350f6f3a4c66e9cc641b8b0"],["/image/slideshow/carou-1.jpg","77e03ebc23d7495e85347d4e461b2013"],["/image/slideshow/offers1.jpg","48de28a110f60206fb2d3db548d284a4"],["/image/slideshow/offers2.jpg","130290b95c2f275c60ad492562d757f9"],["/image/slideshow/offers3.jpg","ac6ee61799990c832c5151f35c044e87"],["/image/slideshow/placeholder.jpg","73e690a051edb2a9f42325c106e80bcc"],["/image/slideshow/redeem-1.jpg","fd76bba6112d4fc1c2b445e9cfbe6013"],["/image/slideshow/redeem.jpg","945ee4b6a782e8d731f343873dcab6a4"],["/image/small/daniel.jpg","075cb9ba1c624accd53a779c7e2090b9"],["/image/small/elliot.jpg","38068209141245e4bcf3bf833f0d1563"],["/image/small/elyse.jpg","993538183965610bbdfac614b4ad7c17"],["/image/small/glasses.jpg","834fb71fcabc742aa4d0fdb722ff868e"],["/image/small/helen.jpg","76c0a487d4e700a54c682eeff2b600e6"],["/image/small/ladies-and-gentlemen.jpg","f613893b5439633f614227ca3bf758cc"],["/image/small/ladies__blue-dress.jpeg","90427496a86e0dddda6cffa88118a033"],["/image/small/ladies__canvas.jpeg","e7c76fcb457e474d3cd143d20e9e3a1a"],["/image/small/ladies__collection.jpg","8df8cd5168a9b864d2a5ea9cdc94e7be"],["/image/small/ladies__crop-top.jpeg","f26faf2c960838ff73e9eb1a094d136f"],["/image/small/ladies__dancing-shoes.jpeg","bfdb3219b779eff6689b847bc680da17"],["/image/small/ladies__flats.jpg","3d658f3ceb51d81b8d01c634d229851c"],["/image/small/ladies__red-heels.jpeg","afdee1a60ce0df8e049e850db9871b12"],["/image/small/ladies__runway.jpeg","a7889cbfef75b7489014d8910abd48f9"],["/image/small/ladies__shoes.jpg","d32ad82ead4bc522bc50f04f1055481f"],["/image/small/ladies__shopping-bags.jpeg","44471f0e31786f54a4cfd8a5466371e6"],["/image/small/ladies__shopping.jpeg","e90abad51bc16925bcf1d2150b6812e5"],["/image/small/ladies__sneakers.jpg","21ecf090f2a4d0f1cdafcd2a9aa4fb08"],["/image/small/ladies__sparkles.jpeg","abb7711f54c9b79a146302c7f7a643bc"],["/image/small/ladies__wedding-wear.jpeg","64954b132ab128a93b6488732a101424"],["/image/small/ladies__yeezys.jpg","a529b2d2a2db2b7895c3bb3995b84987"],["/image/small/ladies__yellow-shoes.jpg","74f21d9a244cec0698aff6022ba0b1f4"],["/image/small/leather-bag.jpg","144c1f07dce2569c4ebba86af17c2b73"],["/image/small/matthew.jpg","b7a06ca6f51349d93838214eb3b8be96"],["/image/small/men__all-stars.jpeg","2b113490c01b929f17486cd7a59ef6d0"],["/image/small/men__bag.jpeg","4162477434d4ce71ed8a6d3e0e9d16e7"],["/image/small/men__beach-shades.jpg","0aa383b7103b1868abf906152fe7d399"],["/image/small/men__black-converse.jpeg","8ffd6aec587b4a6f49ca816dad260881"],["/image/small/men__black-nikes.jpg","445acabbfd3a7d6774ec8ba217fefc3b"],["/image/small/men__blue-sneakers.jpeg","8b0a1841902bd55f03d7410ba5894b4b"],["/image/small/men__blue-sneakers.jpg","66f566d8ea27aae0ae845857e75a8317"],["/image/small/men__brown-leather.jpg","752b5fce3d48acc4aaabb7efe24e2fa7"],["/image/small/men__dirty-shoes.jpg","2b16e2e7dea5526c2f29ee40a36eefc9"],["/image/small/men__dress-shoes.jpg","8fc6e7709c2b1484399898f31e05644a"],["/image/small/men__fresh-boots.jpeg","ea434a058a72d4ee5dccbf4a8abdb48a"],["/image/small/men__fresh-nicks.jpeg","21c5dc4279000c5047c7195bde60f1f4"],["/image/small/men__leather-casual.jpg","c1f268b45f82443ec8996f37ec1d9164"],["/image/small/men__mad-shades.jpeg","967748e6cd50adf746b7bf3e8f7fa41f"],["/image/small/men__mad-shirt.jpeg","a95263deecba6e57fa3df17c8889c53f"],["/image/small/men__polka-dot.jpeg","142bc3cf23539217e5b031d503e5002c"],["/image/small/men__shoe-jean.jpg","b1916bcfbfa7d970014aa03a59a42044"],["/image/small/men__ties.jpeg","3e3ee41f0513fd114c8ddad1a6722216"],["/image/small/men__tu-pac.jpg","cbaf25835adb810f473af455ed0549fb"],["/image/small/pocket.jpg","532ed5d4dc0f97283e481dd3db116efa"],["/image/small/sky.jpg","2e0282a56c65b5b097fd7a6e4593dc2a"],["/image/small/starz.jpg","a01aa4a5a5e26e4f41b83201ba7f3a7d"],["/image/starz.jpg","604344cb5814e14b1e106cc02af72578"],["/image/subscribe.jpeg","f17cdb4c366e3ebb10635f2ad563a1f3"],["/image/thai.png","6ca8c46f763e8d8d25d5ad945be2903e"],["/image/uk.png","f7b1816c13cca016094af27bc6a500d3"],["/index.html","389961097d454ddaaa69a0f2f75a7db1"],["/manifest.json","360a16656ebeae9f299b5660b87563bd"],["/node_modules/angular-material/modules/closure/tabs/tabs-arrow.svg","0d1694d6cc3ef20f8e131c7cce862ff2"],["/node_modules/md-steppers/md-steppers.png","7d5b7104a90252b0105af9605d997f64"],["/node_modules/tinify/test/examples/dummy.png","d41d8cd98f00b204e9800998ecf8427e"],["/node_modules/tinify/test/examples/voormedia.png","2824dd3c804309be2d275dbc2f16c788"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/^https:\/\/fonts\.googleapis\.com/, toolbox.cacheFirst, {"cache":{"maxEntries":10,"name":"google-apis"}});




