import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";

import {BoardDetailComponent} from './../board/components/board-detail.component.ts';
import {HomeComponent} from "../route-components/home.component.ts";
import {AudioService} from "./../audio/audio-service";
import {FileDatastore} from "../services/file-datastore";
import {BoardRouteComponent} from "../route-components/board.route-component";
import {BoardService} from "../board/services/board.service";


@Component({
	selector: 'soundboard-app',
	bindings: [AudioService, FileDatastore, BoardService],
	host: {
		'[class.Page-navigationOpened]' : 'navigationOpened'
	}
})
@View({
	template: require('./soundboard-app.template.html'),
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{
		path:'/',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},
	{
		path:'/board/:boardId',
		name: 'Board',
		component: BoardRouteComponent
	},
])
export class SoundboardAppComponent {
}