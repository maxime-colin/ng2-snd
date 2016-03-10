import {Component} from "angular2/core";
import {View} from "angular2/core";
import {Input} from "angular2/core";
import {Board} from "../models/board";


@Component({
	selector: 'BoardHeader'
})
@View({
	template: require('./board-header.template.html')
})
export class BoardHeaderComponent {
	@Input() board:Board;
}