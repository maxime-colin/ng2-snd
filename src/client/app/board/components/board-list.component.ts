import {Component, OnInit, ElementRef} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {VoronoiComponent} from "../../voronoi/voronoi.component";
import {BoardService} from "../services/board.service";

@Component({
	selector: 'BoardList',
	bindings: [BoardService],
	template: `
		<ul class="BoardList" (scroll)="onScroll($event)">
			<li class="BoardList_item" *ngFor="#board of boards | async">
				<a
					class="BoardList_link"
					[routerLink]="['Board', {boardId : board.url }]"
				>{{ board.title }}</a>
			</li>
		</ul>
	`,
	directives: [ROUTER_DIRECTIVES, VoronoiComponent]
})
export class BoardListComponent implements OnInit{
	boards: any;
	private scrollTop = 0;
	private static SCROLL_TOP_KEY = 'view.boardList.scrollTop';

	constructor(
		private boardListService: BoardService,
		private elementRef: ElementRef
	) {
	}

	ngOnInit() {
		this.boards = this.boardListService.get().do(() => {
			setTimeout(() => {
				this.elementRef.nativeElement.children[0].scrollTop = sessionStorage.getItem(BoardListComponent.SCROLL_TOP_KEY);
			}, 50);
		});
	}

	public onScroll(event) {
		sessionStorage.setItem(BoardListComponent.SCROLL_TOP_KEY, event.target.scrollTop);
	}
}