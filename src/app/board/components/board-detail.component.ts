import {Component} from "angular2/core";
import {Input} from "angular2/core";

import {VoronoiComponent} from './../../voronoi/voronoi.component.ts'
import {Board} from "../models/board";

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