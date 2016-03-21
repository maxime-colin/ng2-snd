import {View} from "angular2/core";
import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {BoardService} from "../board/services/board.service";
import {BoardDetailComponent} from "../board/components/board-detail.component";
import {BoardHeaderComponent} from "../board/components/board-header.component";
import {Board} from "../board/models/board";
import {Injector} from "angular2/core";


@Component({
	selector: 'BoardDetailRoute',
	host: {class: 'FillContainer'}
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
	directives: [BoardDetailComponent, BoardHeaderComponent],
})
export class BoardDetailRouteComponent implements OnInit {

	public board:Board;

	constructor(
		private injector:Injector,
		private boardListService: BoardService
	) {}

	ngOnInit() {
		let boardId = this.injector.parent.parent.get(RouteParams).get('boardId');
		this.boardListService.getBoardById(boardId).subscribe(board => {
			this.board = board;
		});
	}
}