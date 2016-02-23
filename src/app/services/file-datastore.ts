
import 'rxjs/Rx';
import {Http} from "angular2/http";
import {Component} from "angular2/core";


@Component({
})
export class FileDatastore {

    constructor(
        private http: Http
    ){}

    public get(location) {
        return this.http.get(location)
            .map(response => response.json().data);
    }

}