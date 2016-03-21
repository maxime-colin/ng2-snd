import {BoardEditRouteComponent} from "./board-edit.route-component";
import {Component, View} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {BoardDetailRouteComponent} from "./board-detail.route-component";
import {RouteParams} from "angular2/router";

@Component({
	selector: 'BoardRoute',
	host: {class: 'FillContainer'}
})
@View({
	template: `
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{
		path:'',
		name: 'Detail',
		component: BoardDetailRouteComponent,
		useAsDefault: true
	},
	{
		path:'edit',
		name: 'Edit',
		component: BoardEditRouteComponent
	},
])
export class BoardRouteComponent {
}

