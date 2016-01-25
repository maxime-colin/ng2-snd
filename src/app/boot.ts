/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/two.d.ts" />
/// <reference path="../typings/voronoi.d.ts" />
/// <reference path="../typings/lodash.d.ts" />


import 'angular2/bundles/angular2-polyfills';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {MyAppComponent} from './app.component';

bootstrap(MyAppComponent, [
	ROUTER_PROVIDERS
]);
