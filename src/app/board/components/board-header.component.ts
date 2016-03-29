import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Board} from "../models/board";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
	selector: 'BoardHeader',
	template: require('./board-header.template.html'),
	directives: ROUTER_DIRECTIVES
})
export class BoardHeaderComponent {
	@Input() board:Board;
}