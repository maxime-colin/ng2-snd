import { Component, View, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router'
import {BoardListService} from '../services/board-list.service'
import {VoronoiComponent} from './voronoi.component'

@Component({
	selector: 'board-detail',
	bindings: [BoardListService]
})
@View({
	template: `
		<voronoi [board]="board" *ngIf="board"></voronoi>
	`,
	directives: [VoronoiComponent]
})
export class BoardDetailComponent implements OnInit{
	board: any;

	constructor(
		private _router:Router,
		private _routeParams:RouteParams,
		private _boardListService: BoardListService
	) {
		
	}

	ngOnInit() {
		let boardId = this._routeParams.get('boardId');
		this._boardListService.getBoardById(boardId).subscribe(board => {
			this.board = board;
		});
	}
}