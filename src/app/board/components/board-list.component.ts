import {Component, View, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'
import {BoardService} from './../services/board.service.ts'
import {VoronoiComponent} from "./../../voronoi/voronoi.component.ts";
import {ElementRef} from "angular2/core";

@Component({
	selector: 'BoardList',
	bindings: [BoardService]
})
@View({
	template: require('./board-list.template.html'),
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

				console.log(sessionStorage.getItem(BoardListComponent.SCROLL_TOP_KEY));
				this.elementRef.nativeElement.children[0].scrollTop = sessionStorage.getItem(BoardListComponent.SCROLL_TOP_KEY);
			}, 50);
		});
	}

	public onScroll(event) {
		sessionStorage.setItem(BoardListComponent.SCROLL_TOP_KEY, event.target.scrollTop);
	}
}