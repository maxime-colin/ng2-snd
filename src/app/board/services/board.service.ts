import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FileDatastore} from "../../services/file-datastore";
import {AngularFire} from "angularfire2";


@Injectable()
export class BoardService {
	
	constructor(
		private fileDataStore: FileDatastore,
		private angularFire: AngularFire
	) {
		// code...
	}

	public get() {
		return this.angularFire.list('/boards-overview');
	}


	public getBoardById(boardId: string) : Observable<any>{

		return Observable.create(observer => {
			var Firebase = require('firebase');

			// Get a database reference to our posts
			var ref = new Firebase("https://mc-pad-test.firebaseio.com/boards/" + boardId);

			// Attach an asynchronous callback to read the data at our posts reference
			ref.on("value", (snapshot) => {

				var obj = snapshot.val();

				// Load audio
				// @todo : Gérer le chargement ailleurs
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


			//ref.on('child_added', (child:any) => {
			//	obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
			//});
			//
			//ref.on('child_removed', (child:any) => {
			//	obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
			//});
			//
			//ref.on('child_changed', (child:any, prevKey: string) => {
			//	arr = onChildChanged(arr, child, prevKey)
			//	// This also manages when the only change is prevKey change
			//	obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
			//});
		});
	}
}