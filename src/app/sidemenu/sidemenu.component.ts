import {Component, View} from "angular2/core";
import {BoardListComponent} from "../board/components/board-list.component";

@Component({
	selector: 'Sidemenu'
})
@View({
	template: `
		<BoardList></BoardList>
	`,
	directives: [BoardListComponent]

})
export class SidemenuComponent {

}