import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FileDatastore} from "../../services/file-datastore";


@Injectable()
export class BoardService {
	
	constructor(private fileDataStore: FileDatastore) {
		// code...
	}

	public get() {

		



		return Observable.create(observer => {
			var Firebase = require('firebase');

			// Get a database reference to our posts
			var ref = new Firebase("https://mc-pad-test.firebaseio.com/boards/");

			// Attach an asynchronous callback to read the data at our posts reference
			ref.on("value", function(snapshot) {

				var obj = snapshot.val();
				let ar = Object.keys(obj).map((k) => {
					obj[k].key = k;
					return obj[k];
				});
				observer.next(ar);
			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			});
		});
	}

	public getBoardById(boardId: string) : Observable<any>{
		return Observable.create(observer => {
			var Firebase = require('firebase');

			// Get a database reference to our posts
			var ref = new Firebase("https://mc-pad-test.firebaseio.com/boards/" + boardId);
		
			// Attach an asynchronous callback to read the data at our posts reference
			ref.on("value", (snapshot) => {

				var obj = snapshot.val();
				
				console.log(obj);

				_.each(obj.tiles, (tile) => {
					this.fileDataStore.get(tile.audio).subscribe((data) => {
						tile.audioData = data;
						tile.audioLoaded = true;
					});
				});

				observer.next(obj);
			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			});
		});
	}
}