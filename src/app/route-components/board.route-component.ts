import {View} from "angular2/core";
import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {BoardService} from "../board/services/board.service";
import {BoardDetailComponent} from "../board/components/board-detail.component";
import {BoardHeaderComponent} from "../board/components/board-header.component";
import {Board} from "../board/models/board";


@Component({
	selector: 'BoardRouteComponent',
})
@View({
	template: `
		<div class="Page" *ngIf="board">
			<div class="Page_header">
				<BoardHeader [board]="board"></BoardHeader>
			</div>
			<div class="Page_content">
				<BoardDetail [board]="board"></BoardDetail>
			</div>
		</div>
	`,
	directives: [BoardDetailComponent, BoardHeaderComponent]
})
export class BoardRouteComponent implements OnInit {

	public board:Board;

	constructor(
		private routeParams:RouteParams,
		private boardListService: BoardService
	) {}

	ngOnInit() {
		let boardId = this.routeParams.get('boardId');
		this.boardListService.getBoardById(boardId).subscribe(board => {
			this.board = board;
		});
	}
}