import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {BoardListComponent} from './components/board-list.component';
import {BoardDetailComponent} from './components/board-detail.component';
import {AudioService} from "./audio/audio-service";


@Component({
	selector: 'my-app',
	bindings: [AudioService]
})
@View({
	templateUrl: 'app/app.template.html',
	directives: [ROUTER_DIRECTIVES, BoardListComponent]
})
@RouteConfig([
	{
		path:'/board/:boardId', 
		name: 'BoardDetail', 
		component: BoardDetailComponent
	},
])
export class MyAppComponent {

}