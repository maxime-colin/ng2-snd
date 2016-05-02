import {provide, enableProdMode} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";
import {APP_BASE_HREF} from "angular2/platform/common";
import {SoundboardAppComponent} from "./app/soundboard-app/soundboard-app.component";
import {LocationStrategy} from "angular2/src/platform/browser/location/location_strategy";
import {HashLocationStrategy} from "angular2/src/platform/browser/location/hash_location_strategy";
import {boards} from "./app/board/reducers/boards";
import * as AngularFire2 from 'angularfire2/angularfire2';
import {provideStore} from '@ngrx/store';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(SoundboardAppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),

  AngularFire2.FIREBASE_PROVIDERS,
  AngularFire2.defaultFirebase('https://mc-pad-test.firebaseio.com'),

  provideStore({boards}),
]);

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
