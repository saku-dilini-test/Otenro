import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as data from './app/madeEasy.json';

declare var Notification: any;
declare var subs;
declare var appId : string;
declare var userId : string;

if (environment.production) {
  enableProdMode();
}
// appId = (<any>data).appId;
// userId = (<any>data).userId;
// console.log( (<any>data).appId);
// console.log( appId);

// Notification.requestPermission(function(status) {
//   console.log('Notification permission status:', status);
// });


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./service-worker.js', { scope: './' }).then(function (registration) {
//     // Registration was successful
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     console.log('registration: ', (registration));
//     navigator.serviceWorker.ready.then(reg => {
//       reg.pushManager.getSubscription().then(sub => {
//         if (sub == undefined) {
//           console.log('sub : ' + 'undefined');
//           navigator.serviceWorker.getRegistration().then((reg) => {
//             reg.pushManager.subscribe({
//               userVisibleOnly: true
//             }).then(sub => {
//               console.log('sub : ' + JSON.stringify(sub));
//               localStorage.setItem("sub",JSON.stringify(sub));
//             },err =>{
//               console.log('registration error occured: ' + err);
//             })
//           },err =>{
// console.log('registration error occured: ' + err);
// })
//         } else {
//           console.log('sub : ' + sub);
//           // subs = sub;
//           localStorage.setItem("sub",JSON.stringify(sub));
//         }
//       },err=>{
//         console.log('registration error occured: ' + err);
//       });
//
//     })
//   }).catch(function (err) {
//     // registration failed :(
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }

platformBrowserDynamic().bootstrapModule(AppModule);
