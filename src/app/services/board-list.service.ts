import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BoardListService {
	
	constructor() {
		// code...
	}

	public get() {

		return Observable.create(observer => {
			var Firebase = require('firebase');

			// Get a database reference to our posts
			var ref = new Firebase("https://mc-pad-test.firebaseio.com/");
		
			// Attach an asynchronous callback to read the data at our posts reference
			ref.on("value", function(snapshot) {
				observer.next(snapshot.val());
			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			});


		});
	}
}