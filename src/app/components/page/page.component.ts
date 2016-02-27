import {Component, View} from 'angular2/core';
import {BoardListComponent} from './../board-list/board-list.component';
import {BoardDetailComponent} from './../board-detail/board-detail.component';
import {HomeComponent} from "./../home/home.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {AudioService} from "../../audio/audio-service";


@Component({
	selector: 'page',
	bindings: [AudioService]
})
@View({
	templateUrl: 'app/components/page/page.template.html',
	directives: [ROUTER_DIRECTIVES, BoardListComponent]
})
@RouteConfig([
	{
		path:'/',
		name: 'Home',
		component: HomeComponent
	},
	{
		path:'/board/:boardId',
		name: 'BoardDetail',
		component: BoardDetailComponent
	},
])
export class PageComponent {

}