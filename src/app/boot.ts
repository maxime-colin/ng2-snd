/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/quad-tree.d.ts" />
/// <reference path="../typings/paper.d.ts" />
/// <reference path="../typings/two.d.ts" />
/// <reference path="../typings/voronoi.d.ts" />
/// <reference path="../typings/lodash.d.ts" />
/// <reference path="../typings/audio-context.d.ts" />

import 'angular2/bundles/angular2-polyfills';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy} from "angular2/router";
import {HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {SoundboardAppComponent} from "./components/soundboard-app/soundboard-app.component";

bootstrap(SoundboardAppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	provide(LocationStrategy, {useClass: HashLocationStrategy})
]);

