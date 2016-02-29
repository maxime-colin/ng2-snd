import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";

import {BoardDetailComponent} from './../board/components/board-detail.component.ts';
import {HomeComponent} from "../home/home.component";
import {AudioService} from "./../audio/audio-service";
import {NavigationService} from "./../navigation/navigation.service";
import {NavigationComponent} from "./../navigation/navigation.component";


@Component({
	selector: 'soundboard-app',
	bindings: [AudioService, NavigationService],
	host: {
		'[class.Page-navigationOpened]' : 'navigationOpened'
	}
})
@View({
	template: require('./soundboard-app.template.html'),
	directives: [ROUTER_DIRECTIVES, NavigationComponent]
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
export class SoundboardAppComponent {
	public navigationOpened: boolean = false;

	constructor(
		private navigationService: NavigationService
	) {}

	ngOnInit():any {
		this.navigationOpened = this.navigationService.state.opened;
		this.navigationService.change$.subscribe(state => {
			this.navigationOpened = state.opened;
		});
	}
}