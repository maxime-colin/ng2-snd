import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {BoardListComponent} from './components/board-list.component';
import {BoardDetailComponent} from './components/board-detail.component';


@Component({
	selector: 'my-app',
	bindings: []
})
@View({
	templateUrl: 'app/app.template.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{
		path:'/',
		name: 'BoardList',
		component: BoardListComponent
	},
	{
		path:'/board/:boardId', 
		name: 'BoardDetail', 
		component: BoardDetailComponent
	},
])
export class MyAppComponent {

}