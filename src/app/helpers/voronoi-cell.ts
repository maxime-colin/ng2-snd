import {VoronoiPoint} from './point';

export class VoronoiCell {

	public position: VoronoiPoint;
	public path: Array<VoronoiPoint>;
	public hovered: boolean;

	constructor(
		public cell: any
	) {

	}

	get x() :number {
		return this.position.x;
	}

	get y() :number {
		return this.position.y;
	}

	public centroidPosition(): VoronoiPoint {
		var first = this.path[0];
		var last = this.path[this.path.length-1];

		if( ! first) {
			//console.error('No first !!', this.path);
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

		return new VoronoiPoint(
			Math.round(x/f),
			Math.round(y/f)
		);
	}

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
			new VoronoiPoint(xLeft, yTop),
			new VoronoiPoint(xRight, yBottom)
		]
	}

	public pointIntersection(point) {
		// ray-casting algorithm based on
		// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

		var x = point.x, y = point.y;

		var inside = false;
		for (var i = 0, j = this.path.length - 1; i < this.path.length; j = i++) {
			console.log(i, j);

			var xi = this.path[i].x, yi = this.path[i].x;
			var xj = this.path[j].y, yj = this.path[j].y;

			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	};
}