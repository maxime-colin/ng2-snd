import {Point} from './point';

export class VoronoiCell {

	public position: Point = {x: null, y: null};
	public path: Array<Point>;

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
}