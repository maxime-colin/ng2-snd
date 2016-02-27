import {Component} from "angular2/core";
import {View} from "angular2/core";
import {NavigationService} from "../../navigation/navigation.service";
import {OnInit} from "angular2/core";
import {OnDeactivate} from "angular2/router";
import {OnDestroy} from "angular2/core";

@Component({
	selector : 'home',
})
@View({
	template: ''
})
export class HomeComponent implements OnInit, OnDestroy{

	constructor(
		private navigationService: NavigationService
	){}

	ngOnInit():any {
		this.navigationService.open();
	}

	ngOnDestroy():any {
		this.navigationService.close();
	}
}