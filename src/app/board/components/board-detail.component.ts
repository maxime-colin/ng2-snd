import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {Component} from "angular2/core";
import {View} from "angular2/core";
import {OnInit} from "angular2/core";

import {BoardService} from './../services/board.service.ts'
import {VoronoiComponent} from './../../voronoi/voronoi.component.ts'

@Component({
	selector: 'BoardDetail',
	bindings: [BoardService]
})
@View({
	template: `
		<Voronoi [board]="board" *ngIf="board" class="Voronoi-full"></Voronoi>
	`,
	directives: [VoronoiComponent]
})
export class BoardDetailComponent implements OnInit{
	board: any;

	constructor(
		private _router:Router,
		private _routeParams:RouteParams,
		private _boardListService: BoardService
	) {
		
	}

	ngOnInit() {
		let boardId = this._routeParams.get('boardId');
		this._boardListService.getBoardById(boardId).subscribe(board => {
			this.board = board;
		});
	}
}