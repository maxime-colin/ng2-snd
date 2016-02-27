import {Component} from "angular2/core";
import {View} from "angular2/core";
import {BoardListComponent} from "../components/board-list/board-list.component";
import {NavigationService} from "./navigation.service";
import {OnInit} from "angular2/core";

@Component({
	selector: 'navigation',
})
@View({
	templateUrl: 'app/navigation/navigation.template.html',
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
