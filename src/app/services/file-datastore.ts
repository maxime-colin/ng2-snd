import 'rxjs/Rx';
import {Http} from "angular2/http";
import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";


@Component({
})
export class FileDatastore {

    constructor(
        private http: Http
    ){}

    public get(location) {

        return new Observable((observer) => {
            var req = new XMLHttpRequest();
            req.open('GET',location + '?host=' + window.location.host, true);
            req.responseType = 'arraybuffer';
            req.onload = function() {
                observer.next(req.response);
            };
            req.send();
        });


        //return this.http.get(location + '?host=' + window.location.host)
        //    .map(response => response.arrayBuffer());
    }

}