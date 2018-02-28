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
this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
this.addEventListener('activate', event => {
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



 this.addEventListener('fetch', function(event) {
   console.log('[Service Worker] Fetch', event.request.url);
   // var dataUrl = 'https://mpfc.staging.wpengine.com';
   // if (e.request.url.indexOf(dataUrl) > -1) {
   if (event.request.url.startsWith(self.location.origin) || event.request.method == 'GET') {

     /*
      * When the request URL contains dataUrl, the app is asking for fresh
      * data. In this case, the service worker always goes to the
      * network and then caches the response. This is called the "Cache then
      * network" strategy:
      * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
      */
     event.respondWith(
       caches.open(RUNTIME).then(function(cache) {
         return fetch(event.request).then(function(response){
           if (response != undefined){
             return cache.put(event.request, response.clone()).then(() => {
                 return response;
           });
           }
         }).catch(function(e) {
           return caches.match(event.request).then(cachedResponse => {
               if (cachedResponse) {
                 return cachedResponse;
               }
             });
         })
       })
     );
   } else {
     /*
      * The app is asking for app shell files. In this scenario the app uses the
      * "Cache, falling back to the network" offline strategy:
      * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
      */
     event.respondWith(
       caches.match(event.request).then(function(response) {
         return response || fetch(event.request);
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
