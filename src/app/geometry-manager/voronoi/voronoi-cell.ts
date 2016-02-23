import {Point} from "../common/point";
import {Component} from "angular2/core";
import {FileDatastore} from "../../services/file-datastore";
import {AudioService} from "../../audio/audio-service";

export class VoronoiCell {

	private path: Point[];
	public hovered = false;
	public voronoiId;

	constructor(
		private cell:any,
		private position: Point
	){}


	get x() {
		return this.position.x;
	}

	get y() {
		return this.position.y;
	}

	public getCell() {
		return this.cell;
	}

	public getPath() {
		return this.path;
	}

	public setPosition(position: Point) {
		this.position = position;
	}

	public getPosition() {
		return this.position;
	}

	/**
     * Set path from voronoi halfedges
     * @param halfedges
     */
    public setPathFromHalfedges(halfedges) {
        // Reset
        this.path = [];

        // Inject path points
		for (let halfedge of halfedges) {
			//noinspection TypeScriptUnresolvedFunction
            this.path.push(new Point(
                halfedge.getStartpoint().x,
                halfedge.getStartpoint().y
            ));
		}
	}

	/**
	 * Move to centroid position of cell
	 */
	public moveToCentroid() {
		this.setPosition(this.centroidPosition());
	}

	/**
	 * Return centroid position
	 * @returns {Point}
	 */
	public centroidPosition(): Point {
		var first = this.path[0];
		var last = this.path[this.path.length-1];

		if( ! first) {
			return this.position;
		}

		if (first.x != last.x || first.y != last.y){
			this.path.push(first);
		}

		var twicearea = 0;
		var x = 0;
		var y = 0;
		var nPts = this.path.length;
		var p1;
		var p2;
		var f;

		for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
			p1 = this.path[i];
			p2 = this.path[j];
			f = p1.x*p2.y - p2.x*p1.y;
			twicearea += f;
			x += ( p1.x + p2.x ) * f;
			y += ( p1.y + p2.y ) * f;
		}
		f = twicearea * 3;

		return new Point(
			Math.round(x/f),
			Math.round(y/f)
		);
	}

	/**
	 * Return bounding box
	 * @returns {Point[]}
	 */
	public boundingBox() {

		var first 	= this.path[0];
		var xRight 	= first.x;
		var xLeft 	= first.x;
		var yTop 	= first.y;
		var yBottom = first.y;

		var pathLength = this.path.length;
		for(var i = 1; i < pathLength; i++) {
			const current = this.path[i];
			if(xRight < current.x)	xRight = current.x;
			if(xLeft > current.x) 	xLeft = current.x;
			if(yTop > current.y) 	yTop = current.y;
			if(yBottom < current.y) yBottom = current.y;
		}

		return [
			new Point(xLeft, yTop),
			new Point(xRight, yBottom)
		]
	}

	/**
	 * Intersect point
	 * @param point
	 * @returns {boolean}
	 */
	public intersectPoint(point: Point): boolean {
		// ray-casting algorithm based on
		// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

		var inside = false;
		for (var i = 0, j = this.path.length - 1; i < this.path.length; j = i++) {

			var xi = this.path[i].x;
			var yi = this.path[i].y;
			var xj = this.path[j].x;
			var yj = this.path[j].y;

			var intersect = ((yi > point.y) != (yj > point.y))
				&& (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	};


	play(fileDatastore: FileDatastore, audioService:AudioService):void {
		fileDatastore.get(this.cell.audio).subscribe(data => {
			console.log(data);
			audioService.playFromDataURL(data);
		});
	}
}