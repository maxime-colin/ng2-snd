import {Component, View, OnInit} from "angular2/core";

import {BoardListComponent} from "../board/components/board-list.component.ts";
import {NavigationService} from "./navigation.service";

@Component({
	selector: 'navigation',
})
@View({
	template: require('./navigation.template.html'),
	directives: [BoardListComponent]
})
export class NavigationComponent implements OnInit{

	private opened: boolean = false;

	constructor(
		private navigationService: NavigationService
	) {}

	ngOnInit():any {
		this.opened = this.navigationService.state.opened;
		this.navigationService.change$.subscribe(state => {
			this.opened = state.opened;
		});
	}

}
