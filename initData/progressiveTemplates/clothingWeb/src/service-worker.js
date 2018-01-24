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
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
var CACHE_VERSION = 'app-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './assets/css/bootstrap.min.css',
  './assets/css/owl.carousel.min.css',
  './assets/icons/icon-72x72.png',
  './assets/icons/icon-96x96.png',
  './assets/icons/icon-128x128.png',
  './assets/icons/icon-144x144.png',
  './assets/icons/icon-152x152.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-384x384.png',
  './assets/icons/icon-512x512.png',
  './assets/images/promotions/1.jpg',
  './assets/images/promotions/2.jpg',
  './assets/images/promotions/3.jpg',
  './assets/images/promotions/4.jpg',
  './assets/images/promotions/5.jpg',
  './assets/images/secondNavi/cat1.png',
  './assets/images/secondNavi/cat2.png',
  './assets/images/slider/1.jpg',
  './assets/images/slider/2.jpg',
  './assets/images/slider/3.jpg',
  './assets/images/thirdNavi/prod1.png',
  './assets/images/thirdNavi/prod2.png',
  './assets/images/thirdNavi/prod3.png',
  './assets/images/thirdNavi/prod4.png',
  './assets/images/amex.png',
  './assets/images/Mastercard.png',
  './assets/images/test.png',
  './assets/images/visa.png',
  './assets/js/bootstrap.min.js',
  './app/header/header.component.html',
  './app/header/header.component.css',
  './app/footer/footer.component.html',
  './app/footer/footer.component.css',
  './app/page-body/aboutus/aboutus.component.html',
  './app/page-body/aboutus/aboutus.component.css',
  './app/page-body/contact/contact.component.html',
  './app/page-body/contact/contact.component.css',
  './app/page-body/policies/policies.component.html',
  './app/page-body/policies/policies.component.css',
  './app/page-body/terms/terms.component.html',
  './app/page-body/terms/terms.component.css',
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
//  console.log('Fetch event for ', event.request.url);
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
//          console.log('Found ', event.request.url, ' in cache');
          return cachedResponse;
        }

        //console.log('Network request for ', event.request.url);
        return fetch(event.request)

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      }).catch(err=>{

      })
    );
  }

});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('samples/page' + primaryKey + '.html');
    notification.close();
  }

  // TODO - close all notifications when one is clicked

});

self.addEventListener('push', function(e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: "I don't want any of this",
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
