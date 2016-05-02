import {Component, Input} from "angular2/core";
import {Board} from "../models/board";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
	selector: 'BoardHeader',
	template: `
	<div class="BoardHeader">
		<a [routerLink]="['/Home']" class="BoardHeader_back">
			<img src="assets/img/boule.png" class="BoardHeader_logo">
		</a>
		<div class="BoardHeader_title">
			{{board.title}}
		</div>
		<div class="BoardHeader_actions">
			<a [routerLink]="['/Board', {boardId: board.url}, 'Edit']" class="ion-edit">Editer</a>
		</div>
	</div>
	`,
	directives: ROUTER_DIRECTIVES
})
export class BoardHeaderComponent {
	@Input() board:Board;
}