import { Component, View } from 'angular2/core';
import { BoardListService } from './services/board-list.service';

@Component({
	selector: 'my-app',
	bindings: [BoardListService]
})
@View({
	template: `
	<ul>
	<li *ngFor="#board of boards">{{ board.title }}</li>
	</ul>
	`,
	directives: []
})
export class MyAppComponent {
	boards: any;
	constructor(boardListService: BoardListService) {

		var self = this;
		boardListService.get().subscribe(function(boards) {
			console.log(boards);
			self.boards = boards;
		});
	
		
	}
}