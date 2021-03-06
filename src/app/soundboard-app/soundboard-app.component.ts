import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";

import {BoardDetailComponent} from './../board/components/board-detail.component.ts';
import {HomeComponent} from "../route-components/home.component.ts";
import {AudioService} from "./../audio/audio-service";
import {FileDatastore} from "../services/file-datastore";
import {BoardRouteComponent} from "../route-components/board.route-component";
import {BoardService} from "../board/services/board.service";
import {AudioPlayerFactory} from "../audio/audio-player-factory";
import {SidemenuComponent} from "../sidemenu/sidemenu.component";


@Component({
	selector: 'soundboard-app',
	bindings: [AudioService, FileDatastore, BoardService, AudioPlayerFactory],
	template: `
		<Sidemenu class="App_sidemenu"></Sidemenu>
		<div class="App_content">
			<router-outlet></router-outlet>
		</div>
	`,
	directives: [ROUTER_DIRECTIVES, SidemenuComponent]
})
@RouteConfig([
	{
		path:'/',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},
	{
		path:'/board/:boardId/...',
		name: 'Board',
		component: BoardRouteComponent
	},
])
export class SoundboardAppComponent {
}