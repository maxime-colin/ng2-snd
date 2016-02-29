import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";


import {NavigationState} from "./navigation-state";


export class NavigationService {

	public change$: Observable<NavigationState>;

	private observer: Observer<NavigationState>;
	state: NavigationState = {
		opened : false,
	};

	constructor()  {
		this.change$ = new Observable(observer => {
			this.observer = observer
		}).share();
	}

	public close() {
		this.state.opened = false;
		setTimeout(() => this.observer.next(this.state));
	}

	public open() {
		this.state.opened = true;
		setTimeout(() => this.observer.next(this.state));
	}
}
