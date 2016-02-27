import {Component, View, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'
import {BoardListService} from '../../services/board-list.service'
import {VoronoiComponent} from "./../voronoi/voronoi.component";

@Component({
	selector: 'board-list',
	bindings: [BoardListService]
})
@View({
	templateUrl: 'app/components/board-list/board-list.template.html',
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