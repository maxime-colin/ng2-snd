import {Component, View, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'
import {BoardListService} from './board-list.service.ts'
import {VoronoiComponent} from "./../../voronoi/voronoi.component.ts";

@Component({
	selector: 'board-list',
	bindings: [BoardListService]
})
@View({
	template: require('./board-list.template.html'),
	directives: [ROUTER_DIRECTIVES, VoronoiComponent]
})
export class BoardListComponent implements OnInit{
	boards: any;
	constructor(private _boardListService: BoardListService) {
	}

	ngOnInit() {
		this._boardListService.get().subscribe(boards => {
			this.boards = boards;
		});
	}
}