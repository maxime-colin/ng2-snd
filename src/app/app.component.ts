import { Component, View } from 'angular2/core';
import { BoardListService } from './services/board-list.service';
import { SubComponent } from './components/subcomponent/subcomponent.component';

@Component({
	selector: 'my-app',
	bindings: [BoardListService]
})
@View({
	template: `
	<ul>
	<li>{{ appStatus }}</li>
	<li>{{ serviceStatus }}</li>
	<sub-component></sub-component>
	</ul>
	`,
	directives: [SubComponent]
})
export class MyAppComponent {
	appStatus: string;
	serviceStatus: string;

	constructor(boardListService: BoardListService) {
		//this.serviceStatus = myService.getMessage();
		this.appStatus = 'Application is working.';


		boardListService.get().subscribe(function(boards) {
			console.log('boards', boards);
		});
	
		
	}
}