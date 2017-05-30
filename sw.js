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

var precacheConfig = [["/Icons/2co.png","4e1f79bc1b0b3007eeec08a1b4c5d0d3"],["/Icons/american-express.png","fc909cb2454e38212b121841211a8a9b"],["/Icons/icon.png","dcd98b21789f70ae72a4df9b1af5f0d2"],["/Icons/icon128.png","888cd55d8081ebe52760f3bba7e1dd15"],["/Icons/icon144.png","19a1aac278fdb411dadba38ca939a547"],["/Icons/icon192.png","38942066dcfc883037d714b2a6c7eaf0"],["/Icons/icon256.png","b209523f194995f119df94c5f4401e5e"],["/Icons/icon348.png","ededbd2175a2cfe523382e6ecfb8dadb"],["/Icons/icon48.png","d30807f4a2cdd14083a6fbb0f3ab10e5"],["/Icons/icon92.png","3fd4a507595ddd621977a59276afe58d"],["/Icons/mastercard.png","876f2e138a777d46de3c68ddbc153ce5"],["/Icons/moneygram.png","a1704d1495cd821d7290bd7a52d8cf3c"],["/Icons/paypal.png","b9533bd33b23e76a999a03c21bca2729"],["/Icons/picknplay.png","1a90b3012391b12785e8bc8b2255f44e"],["/Icons/visa.png","e7dcd9004ed4491040a48fd400edd38b"],["/Icons/western-union.png","55aed89af1f884037d52e61a1c2bd1e7"],["/app/about-us/about.html","8d9fa15e2d9dac9f2bca67595fcfaf86"],["/app/add-to-homescreen/add-homescreen.html","618e9b5251f620d10ec0232b74813797"],["/app/app.component.html","e4027a1144abbbe7864b7b06320a69f5"],["/app/assurances/assurance.html","19260a76256c1148ff34046a8c6ce222"],["/app/categories/categories.html","744145b76ec725dfe41c5653df7491b5"],["/app/checkout/billing.html","90b81e856f48f52d342bdc46e879a853"],["/app/checkout/checkout.html","2c9d1c0601755bf8f47b55791d9eb146"],["/app/checkout/delivery.html","aabb54fef19883e1f633a7d023f28339"],["/app/checkout/order.html","9e0955a04f4a86304c4bf60d553e40fa"],["/app/delete-modal/delete-modal.html","9e8743ffc4a7e1c8c6fa003adb12c3de"],["/app/footer/footer.html","7a57448d9bc8fcccdc210eafd3cbebcf"],["/app/home/home.html","94512e7663da5e5b4bb6b6514b7e2f14"],["/app/login/login.html","ca4c22dac89e9c8688afea7520d4c857"],["/app/privacy-policy/privacy.html","79a4ae04c0db9749c7d38ba473bba1e9"],["/app/product-category/product-category.html","d75457f3ae31e02d46662b71bcd4b6ff"],["/app/product-detail/bid-table/bid-table.html","a6a54b3d9bdf4de8d2d41619cade194a"],["/app/product-detail/countdown-timer/countdown-timer.html","b3b7cf5512ac6f496acca03b584f942b"],["/app/product-detail/product-detail.html","978bbeb597543403ce8d04ad8edd26c6"],["/app/product-detail/tabs/tabs.html","02b44b32d083dbdb867e3066e55aa869"],["/app/products.json","f12101840080a98ea8131de29f95bcbd"],["/app/products/product-list.html","f79547c74a7aa15353198717e73cd232"],["/app/profile-page/auctions.html","63d2e6e5a36013b03a175612c7411e39"],["/app/profile-page/cart.html","5330cddefc1b87a6bd3dcfea40d45dfe"],["/app/profile-page/edit-profile.html","928668e7da72e6318668795adcc12e07"],["/app/profile-page/invoice-modal/invoice-modal.html","e6821c51266403c4ef7a54fe6e8c1dbc"],["/app/profile-page/modal/purchase-modal.html","21d0a0d2f3f9c69853148df1268a36c0"],["/app/profile-page/orders.html","14bd74f9639e5ccc34fde95863906c0f"],["/app/profile-page/profile-page.html","6b3bc1b02feed0154c2efc6b34504d24"],["/app/profile-page/purchases.html","28d21f897755599cbf9ebd765b6fea1b"],["/app/profile-page/rewards.html","797c874cffadbe5fc6116a8feab27ba4"],["/app/terms-and-conditions/terms.html","27f7ddaccef25178dc041c5b2e5cf7fb"],["/dist/css/app.min.css","6905c10f20248c5037f69b1ba41a3a16"],["/dist/fonts/roboto/Roboto-Bold.eot","ecdd509cadbf1ea78b8d2e31ec52328c"],["/dist/fonts/roboto/Roboto-Bold.ttf","e31fcf1885e371e19f5786c2bdfeae1b"],["/dist/fonts/roboto/Roboto-Bold.woff","dc81817def276b4f21395f7ea5e88dcd"],["/dist/fonts/roboto/Roboto-Bold.woff2","39b2c3031be6b4ea96e2e3e95d307814"],["/dist/fonts/roboto/Roboto-Light.eot","a990f611f2305dc12965f186c2ef2690"],["/dist/fonts/roboto/Roboto-Light.ttf","46e48ce0628835f68a7369d0254e4283"],["/dist/fonts/roboto/Roboto-Light.woff","3b813c2ae0d04909a33a18d792912ee7"],["/dist/fonts/roboto/Roboto-Light.woff2","69f8a0617ac472f78e45841323a3df9e"],["/dist/fonts/roboto/Roboto-Medium.eot","4d9f3f9e5195e7b074bb63ba4ce42208"],["/dist/fonts/roboto/Roboto-Medium.ttf","894a2ede85a483bf9bedefd4db45cdb9"],["/dist/fonts/roboto/Roboto-Medium.woff","fc78759e93a6cac50458610e3d9d63a0"],["/dist/fonts/roboto/Roboto-Medium.woff2","574fd0b50367f886d359e8264938fc37"],["/dist/fonts/roboto/Roboto-Regular.eot","30799efa5bf74129468ad4e257551dc3"],["/dist/fonts/roboto/Roboto-Regular.ttf","df7b648ce5356ea1ebce435b3459fd60"],["/dist/fonts/roboto/Roboto-Regular.woff","ba3dcd8903e3d0af5de7792777f8ae0d"],["/dist/fonts/roboto/Roboto-Regular.woff2","2751ee43015f9884c3642f103b7f70c9"],["/dist/fonts/roboto/Roboto-Thin.eot","dfe56a876d0282555d1e2458e278060f"],["/dist/fonts/roboto/Roboto-Thin.ttf","94998475f6aea65f558494802416c1cf"],["/dist/fonts/roboto/Roboto-Thin.woff","7500519de3d82e33d1587f8042e2afcb"],["/dist/fonts/roboto/Roboto-Thin.woff2","954bbdeb86483e4ffea00c4591530ece"],["/dist/js/app.bundle.min.js","c5dd3a1f3d8f8885e1eb83652656c1ea"],["/dist/js/vendors/vendors.bundle.min.js","2ee35e966d84cb1c3f323e66d0a98d70"],["/image/BidXelSVG.svg","ca840d5589153125874f8b00579a3764"],["/image/daniel.jpg","fcfe2bd1975fa2db1ff60aa0ccdd2349"],["/image/elliot.jpg","432d61fd3f38f54f912047ab678cc0c4"],["/image/elyse.png","ed66029dc38fd1e1d6e3d0c15761f793"],["/image/glasses.jpg","b378cd3835220663d1c95f5fea78eeaa"],["/image/header-bg.png","114d593511446b9a4c6e340f7fef5c84"],["/image/helen.jpg","1d77af030f0208505d263267260b9207"],["/image/ladies-and-gentlemen.jpg","280436db2ba8b2863ab2a4363c099e35"],["/image/ladies__blue-dress.jpeg","eeb0ea08f364d46d1b9fc516bd1bfbdd"],["/image/ladies__canvas.jpeg","78b627bc25e60b6ff35c7b30dcaf3538"],["/image/ladies__classy.jpg","7baffd4ca0db22ccd10fb7f2fb9cdcb1"],["/image/ladies__collection.jpg","d3c1b20f956694e18066a615afd7d8f8"],["/image/ladies__crop-top.jpeg","f07c23e908aca8817ff498d2b07e4e34"],["/image/ladies__dancing-shoes.jpeg","4fe0cd9e5a4242ea4e5ab353fcecc2e8"],["/image/ladies__flats.jpeg","f68559239abd9596fab812906770a935"],["/image/ladies__red-heels.jpeg","d10ce14fd0429a8c0a4aa57d2f1fca9c"],["/image/ladies__runway.jpeg","190400099c175046a694509d3c264d6e"],["/image/ladies__shoes.jpeg","30b77c3092d3c35fab73df70d8d0a792"],["/image/ladies__shopping-bags.jpeg","2c4188c9ad2a26a968f048666025ae3f"],["/image/ladies__shopping.jpeg","e1d6f4505e869c32cc69a75558f27aac"],["/image/ladies__sneakers.jpg","fc510d3b0894fec91a34aa44bb97afb4"],["/image/ladies__sparkles.jpeg","7b33fd4f6722d57e6ec4fbfeadfc13ba"],["/image/ladies__wedding-wear.jpeg","61feb7a04faea5c58fb4c398ec69b2b7"],["/image/ladies__winter-wear.jpg","932ba8ae62f8f4b1cb21fdfb209c11e2"],["/image/ladies__yeezys.jpeg","08facd7439c5b8c14604191c01ac2c84"],["/image/ladies__yellow-shoes.jpg","070c26daae45d327fd3f6626bc6e0bfb"],["/image/leather-bag.jpg","22191e45fcd844902c86c39cdfb62eab"],["/image/leg-shot.jpg","76d3f29f1c6ba96744ec01db635b1068"],["/image/matthew.png","046e91f77483a277a434bac9ae4885e2"],["/image/men__all-stars.jpeg","186502d47613fa2b866bce2bc0b15c82"],["/image/men__bag.jpeg","858a636bcfbf1b4ddb448aa39edf3130"],["/image/men__beach-shades.jpeg","3716c9b14ebcc287f9f48000cf75cefe"],["/image/men__black-converse.jpeg","bf70dd9f995abc47bfeb68e6a43fefaa"],["/image/men__black-nikes.jpeg","15645c4580e4ed446f33319bea8f46a4"],["/image/men__blue-sneakers.jpeg","cf9601a9c3ccd984f7030420f3c33943"],["/image/men__brown-leather.jpg","ccd3297a30f369ad77f8b92c5fe8ebbe"],["/image/men__brown-shoe.jpg","dcc5e97019d25f9fa349596b462a2c9a"],["/image/men__classy.jpg","3e1395107599877ea689f2937f1f020b"],["/image/men__dirty-shoes.jpeg","e3ef144ecb9c2476fc0e37f03f0cae9a"],["/image/men__dress-shoes.jpg","e2fef8e608941140d6a12a8e31936009"],["/image/men__fresh-boots.jpeg","4cde9d9080563061e769aa63d1be263f"],["/image/men__fresh-nicks.jpeg","20b8ae6f22a2ecc2bb35964da92406df"],["/image/men__leather-casual.jpg","4da4de4cd37ad0bbf8fe04b80bf90d55"],["/image/men__mad-shades.jpeg","40386958e720df2e8d17ce36762dbc07"],["/image/men__mad-shirt.jpeg","b0496c5a60a0b7baa639969537e21a25"],["/image/men__polka-dot.jpeg","1a80ee8268b142a9887021a92838bb24"],["/image/men__red-shoe.jpg","dc9ffdc209e6750292a6f27dae49a17c"],["/image/men__ripped-sneakers.jpg","704fb6df7dbc48e2bd5c6e4d0423696a"],["/image/men__shoe-jean.jpeg","e12f293b2730a997f07d41a4864b3b44"],["/image/men__ties.jpeg","b6b50dc108025cbdc13c6618684fcbf9"],["/image/men__tu-pac.jpg","4384ba37e1f03a6edfbcdbc72fccae55"],["/image/pattern.jpg","58255a1279f613c1e194d628645e06c9"],["/image/pocket.jpg","efe3c5bd2cd2c77a0fb4c0fab157c01e"],["/image/shirt.jpg","685a2b1f5091eb9a9c76d6ec6971b3fc"],["/image/shoe.jpg","87c93d7a35714b0770d755e000c93bdf"],["/image/sky.jpg","b578f9594fac6695180557923bca93dd"],["/image/slideshow/behind-light.jpg","ad395d524ded092ade8d50cb45387420"],["/image/slideshow/carou-1.jpg","44ed7abf4a3c1878c237b35c466d4a5c"],["/image/slideshow/hat.jpg","c0ced4f62896926cde3f1a6bf132bef0"],["/image/slideshow/plus-size.jpg","eea930927bf068e4fabe695283b2c090"],["/image/slideshow/pose.jpg","dbd7945bc9fc7370af01396136d8fc4d"],["/image/starz.jpg","bd39f79b18c3c9d7c63d28c0efdaf47b"],["/image/subscribe.jpeg","9f1bf6b43bea3c4d398359905b00797f"],["/image/thai.png","1ec49fd7013be45c62dfdb19f9f2aee4"],["/image/uk.png","0182f976c3afc81e4ef6ffee8e47b787"],["/index.html","b44d8ce2c27a4739727a93ef0ed5b3ab"],["/manifest.json","a72c0b3c5b027983bd56364a383675b6"],["/script.js","e2e8984df4e54d4bd3f125f0a7f81e65"]];
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







