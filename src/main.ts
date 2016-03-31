/*
 * Providers provided by Angular
 */
// TEMP
export interface FirebaseWithPromise<T> extends Firebase, Promise<T> {}
// /TEMP

import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provideStore} from '@ngrx/store';


require('./styles/main.less');

/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];

ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
if ( process != null && process.env.ENV != 'production') {
	ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
} else {
	ngCore.enableProdMode();
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {SoundboardAppComponent} from "./app/soundboard-app/soundboard-app.component";
import {boards} from "./app/board/reducers/boards";
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2'

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
	return browser.bootstrap(SoundboardAppComponent, [
		// Angular stuff
		...ENV_PROVIDERS,
		...HTTP_PROVIDERS,
		...ROUTER_PROVIDERS,
		ngCore.provide(LocationStrategy, {useClass: HashLocationStrategy}),

		// Common injectable providers from the AngularFire lib
		FIREBASE_PROVIDERS,

		// Tell AngularFire the base URL for the Firebase used throughout
		defaultFirebase('https://mc-pad-test.firebaseio.com'),

		// Redux store
		provideStore({boards}),

		ngCore.provide(Window, {useValue: window})
	])
	.catch(err => console.error(err));
}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
	// bootstrap after document is ready
	return document.addEventListener('DOMContentLoaded', main);
}

if (process != null && process.env.ENV == 'development') {
	// activate hot module reload
	if (process.env.HMR) {
		if (document.readyState === 'complete') {
			main();
		} else {
			bootstrapDomReady();
		}
		module.hot.accept();
	} else {
		bootstrapDomReady();
	}
} else {
	bootstrapDomReady();
}
