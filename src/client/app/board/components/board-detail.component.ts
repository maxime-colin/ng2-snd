import {Component, Input} from "angular2/core";
import {Board} from "../models/board";
import {VoronoiComponent} from "../../voronoi/voronoi.component";

@Component({
	selector: 'BoardDetail',
	host: {class: 'BoardDetail'},
	template: `
		<Voronoi [board]="board" *ngIf="board" class="Voronoi-full"></Voronoi>
	`,
	directives: [VoronoiComponent]
})
export class BoardDetailComponent {
	@Input() public board: Board;
}