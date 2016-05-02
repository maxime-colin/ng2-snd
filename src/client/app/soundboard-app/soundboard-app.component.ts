import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {AudioService} from "./../audio/audio-service";
import {FileDatastore} from "../services/file-datastore";
import {BoardRouteComponent} from "../route-components/board.route-component";
import {BoardService} from "../board/services/board.service";
import {AudioPlayerFactory} from "../audio/audio-player-factory";
import {SidemenuComponent} from "../sidemenu/sidemenu.component";
import {HomeComponent} from "../route-components/home.component";


@Component({
	selector: 'soundboard-app',
	template: `
		<Sidemenu class="App_sidemenu"></Sidemenu>
		<div class="App_content">
			<router-outlet></router-outlet>
		</div>
	`,
	providers: [AudioService, FileDatastore, BoardService, AudioPlayerFactory],
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