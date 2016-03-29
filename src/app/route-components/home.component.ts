import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {OnDeactivate} from "angular2/router";
import {OnDestroy} from "angular2/core";

import {BoardListComponent} from "../board/components/board-list.component";

@Component({
	selector : 'Home',
	template: `
		<div class="Page">
			<div class="Page_content">
			   <BoardList></BoardList>
			</div>
		</div>
	`,
	directives: [BoardListComponent]
})
export class HomeComponent {

}