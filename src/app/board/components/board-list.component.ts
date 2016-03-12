import {Component, View, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'
import {BoardService} from './../services/board.service.ts'
import {VoronoiComponent} from "./../../voronoi/voronoi.component.ts";

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
	constructor(private _boardListService: BoardService) {

	}

	ngOnInit() {
		this.boards = this._boardListService.get();
	}
}