/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/paper.d.ts" />
/// <reference path="../typings/two.d.ts" />
/// <reference path="../typings/voronoi.d.ts" />
/// <reference path="../typings/lodash.d.ts" />


import 'angular2/bundles/angular2-polyfills';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {MyAppComponent} from './app.component';
import {LocationStrategy} from "angular2/router";
import {HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";


bootstrap(MyAppComponent, [
	ROUTER_PROVIDERS,
	provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
