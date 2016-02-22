import {Dimension} from "./dimension";

export class Point {

	constructor(public x:number,
				public y:number) {
	}

	/**
	 * Return distance between 2 points
	 * @param target
	 * @returns {number}
     */
	distanceTo(target:Point) {
		return Math.sqrt(
			Math.pow(this.x - target.x, 2) +
			Math.pow(this.y - target.y, 2)
		);
	}

	/**
	 * Return random point
	 * @param dimension
	 * @returns {Point}
     */
	static random(dimension: Dimension):Point {
		return new Point(
			Math.floor(Math.random() * dimension.width),
			Math.floor(Math.random() * dimension.height)
		);
	}
}