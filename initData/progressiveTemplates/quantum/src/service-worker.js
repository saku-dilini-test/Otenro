 // Copyright 2016 Google Inc. All Rights Reserved.
 // Licensed under the Apache License, Version 2.0 (the "License");
 // you may not use this file except in compliance with the License.
 // You may obtain a copy of the License at
 // http://www.apache.org/licenses/LICENSE-2.0
 // Unless required by applicable law or agreed to in writing, software
 // distributed under the License is distributed on an "AS IS" BASIS,
 // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 // See the License for the specific language governing permissions and
 // limitations under the License.
 //

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './index.html',
  './assets/css/animate.min.css',
  './assets/css/bootstrap.min.css',
  './assets/css/feather.min.css',
  './assets/css/font-awesome.min.css',
  './assets/icons/icon-72x72.png',
  './assets/icons/icon-96x96.png',
  './assets/icons/icon-128x128.png',
  './assets/icons/icon-144x144.png',
  './assets/icons/icon-152x152.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-384x384.png',
  './assets/icons/icon-512x512.png',
  './assets/images/secondNavi/1.JPG',
  './assets/images/secondNavi/2.JPG',
  './assets/images/secondNavi/3.JPG',
  './assets/images/secondNavi/4.JPG',
  './assets/images/secondNavi/5.JPG',
  './assets/images/slider/slider1.png',
  './assets/images/slider/slider2.png',
  './assets/images/slider/slider3.png',
  './assets/images/thirdNavi/11.JPG',
  './assets/images/thirdNavi/12.JPG',
  './assets/images/thirdNavi/13.JPG',
  './assets/images/thirdNavi/14.JPG',
  './assets/images/thirdNavi/15.JPG',
  './assets/images/thirdNavi/16.JPG',
  './assets/images/thirdNavi/17.JPG',
  './assets/images/thirdNavi/18.JPG',
  './assets/images/thirdNavi/19.JPG',
  './assets/images/thirdNavi/20.JPG',
  './assets/images/thirdNavi/21.JPG',
  './assets/images/thirdNavi/22.jpg',
  './assets/images/thirdNavi/23.jpg',
  './assets/images/thirdNavi/24.jpg',
  './assets/images/thirdNavi/25.jpg',
  './assets/js/blocs.min.js',
  './assets/js/bootstrap.min.js',
  './assets/js/formHandler.js',
  './assets/js/jqBootstrapValidation.js',
  './assets/js/jquery.touchSwipe.min.js',
  './assets/js/jquery-2.1.0.min.js',
  './assets/js/lazysizes.min.js',
  './assets/js/shim.min.js',
  './assets/js/system.src.js',
  './assets/js/zone.js',
];

 // The install handler takes care of precaching the resources we always need.
 self.addEventListener('install', event => {
     event.waitUntil(
     caches.open(PRECACHE)
       .then(cache => cache.addAll(PRECACHE_URLS))
     .then(self.skipWaiting())
   );
 });

 // The activate handler takes care of cleaning up old caches.
 self.addEventListener('activate', event => {
   const currentCaches = [PRECACHE, RUNTIME];
   event.waitUntil(
         caches.keys().then(cacheNames => {
           return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
       }).then(cachesToDelete => {
         return Promise.all(cachesToDelete.map(cacheToDelete => {
             return caches.delete(cacheToDelete);
       }));
     }).then(() => self.clients.claim())
   );
 });

 // The fetch handler serves responses for same-origin resources from a cache.
 // If no response is found, it populates the runtime cache with the response
 // from the network before returning it to the page.
 self.addEventListener('fetch', event => {
     // Skip cross-origin requests, like those for Google Analytics.
     if (event.request.url.startsWith(self.location.origin) &&  event.request.method == 'GET') {
       event.respondWith(
           caches.match(event.request).then(cachedResponse => {
               if (event.request.url == (registration.scope+'styles.css')) {
                 return fetch(event.request).then(response => {
                       return response;
                 });
               }
               else if(cachedResponse){
                 return cachedResponse;

               }else{
                   return caches.open(RUNTIME).then(cache => {
                       return fetch(event.request).then(response => {
                         // Put a copy of the response in the runtime cache.
                         return cache.put(event.request, response.clone()).then(() => {
                           return response;
                          });
                      });
                    });
               }
            })
       );
     }
 });


//
// self.addEventListener('notificationclose', function(e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;
//
//   console.log('Closed notification: ' + primaryKey);
// });
//
// self.addEventListener('notificationclick', function(e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;
//   var action = e.action;
//
//   if (action === 'close') {
//     notification.close();
//   } else {
//     clients.openWindow('samples/page' + primaryKey + '.html');
//     notification.close();
//   }
//
//   // TODO - close all notifications when one is clicked
//
// });
//
// self.addEventListener('push', function(e) {
//   var body;
//
//   if (e.data) {
//     body = e.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//
//   var options = {
//     body: body,
//     icon: 'images/notification-flat.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     },
//     actions: [
//       {action: 'explore', title: 'Explore this new world',
//         icon: 'images/checkmark.png'},
//       {action: 'close', title: "I don't want any of this",
//         icon: 'images/xmark.png'},
//     ]
//   };
//   e.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });

 //
 // importScripts('../../../../../node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.3.js');
 //
 // const workboxSW = new WorkboxSW();
 // workboxSW.precache([
 //   {
 //     "url": "./styles.css",
 //     "revision": "3a78f101efdbf4c896cef53c323c7bb7"
 //   },
 //   {
 //     "url": "./index.html",
 //     "revision": "ee7d4366f82a736863dc612c50d16e54"
 //   },
 //   {
 //     "url": "./systemjs.config.js",
 //     "revision": "ee7d4366f82a736863dc612c50d16e55"
 //   },
 //   {
 //     "url": "../../../../../node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.3.js",
 //     "revision": "9029a00430d1c6ccf363f3ad77c45d42"
 //   },
 //   {
 //     "url": "../../../../../node_modules/lodash/lodash.js",
 //     "revision": "9029a00430d1c6ccf363f3ad77c45d43"
 //   },
 //   {
 //     "url": "../../../../../node_modules/@angular/compiler/bundles/compiler.umd.js ",
 //     "revision": "9029a00430d1c6ccf363f3ad77c45d44"
 //   },
 //   './assets/css/animate.min.css',
 //   './assets/css/bootstrap.min.css',
 //   './assets/css/feather.min.css',
 //   './assets/css/font-awesome.min.css',
 //   './assets/icons/icon-72x72.png',
 //   './assets/icons/icon-96x96.png',
 //   './assets/icons/icon-128x128.png',
 //   './assets/icons/icon-144x144.png',
 //   './assets/icons/icon-152x152.png',
 //   './assets/icons/icon-192x192.png',
 //   './assets/icons/icon-384x384.png',
 //   './assets/icons/icon-512x512.png',
 //   './assets/images/secondNavi/1.JPG',
 //   './assets/images/secondNavi/2.JPG',
 //   './assets/images/secondNavi/3.JPG',
 //   './assets/images/secondNavi/4.JPG',
 //   './assets/images/secondNavi/5.JPG',
 //   './assets/images/slider/slider1.png',
 //   './assets/images/slider/slider2.png',
 //   './assets/images/slider/slider3.png',
 //   './assets/images/thirdNavi/11.JPG',
 //   './assets/images/thirdNavi/12.JPG',
 //   './assets/images/thirdNavi/13.JPG',
 //   './assets/images/thirdNavi/14.JPG',
 //   './assets/images/thirdNavi/15.JPG',
 //   './assets/images/thirdNavi/16.JPG',
 //   './assets/images/thirdNavi/17.JPG',
 //   './assets/images/thirdNavi/18.JPG',
 //   './assets/images/thirdNavi/19.JPG',
 //   './assets/images/thirdNavi/20.JPG',
 //   './assets/images/thirdNavi/21.JPG',
 //   './assets/images/thirdNavi/22.jpg',
 //   './assets/images/thirdNavi/23.jpg',
 //   './assets/images/thirdNavi/24.jpg',
 //   './assets/images/thirdNavi/25.jpg',
 //   './assets/js/blocs.min.js',
 //   './assets/js/bootstrap.min.js',
 //   './assets/js/formHandler.js',
 //   './assets/js/jqBootstrapValidation.js',
 //   './assets/js/jquery.touchSwipe.min.js',
 //   './assets/js/jquery-2.1.0.min.js',
 //   './assets/js/lazysizes.min.js',
 //   './assets/js/shim.min.js',
 //   './assets/js/system.src.js',
 //   './assets/js/zone.js',
 //   './main.ts',
 // ]);
 //
 // workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'googleapis',
 //     cacheExpiration: {
 //       maxEntries: 20
 //     },
 //     cacheableResponse: {statuses: [0, 200]}
 //   })
 // );
 //
 // workboxSW.router.registerRoute('https://unpkg.com/(.*)',
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'unpkg',
 //     cacheExpiration: {
 //       maxEntries: 10
 //     },
 //     cacheableResponse: {statuses: [0, 200]}
 //   })
 // );
 //
 // workboxSW.router.registerRoute('http://weloveiconfonts.com/(.*)',
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'iconfonts',
 //     cacheExpiration: {
 //       maxEntries: 20
 //     },
 //     cacheableResponse: {statuses: [0, 200]}
 //   })
 // );
 // workboxSW.router.registerRoute('http://localhost/meServer/node_modules/(.*)',
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'node_modules',
 //     cacheExpiration: {
 //       maxEntries: 100
 //     },
 //     cacheableResponse: {statuses: [0, 200]}
 //   })
 // );
 // workboxSW.router.registerRoute('http://localhost:1337/(.*)',
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'template_cache',
 //     cacheExpiration: {
 //       maxEntries: 100
 //     },
 //     cacheableResponse: {statuses: [0, 200]}
 //   })
 // );
 //
 // // We want no more than 50 images in the cache. We check using a cache first strategy
 // workboxSW.router.registerRoute(/\.(?:png|gif|jpg|JPG|PNG)$/,
 //   workboxSW.strategies.cacheFirst({
 //     cacheName: 'images-cache',
 //     cacheExpiration: {
 //       maxEntries: 50
 //     }
 //   })
 // );
