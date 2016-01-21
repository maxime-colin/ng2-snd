import {Point} from '../helpers/point'

export class AnimatedPoint {

	currentPoint:Point;
	destinationPoint:Point;

	constructor(
		currentPoint: Point,
		destinationPoint: Point
	) {
		this.currentPoint = currentPoint;
		this.destinationPoint = destinationPoint;
	}
}