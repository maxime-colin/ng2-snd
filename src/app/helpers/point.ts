export class VoronoiPoint {

	constructor(
		public x:number,
		public y:number
	) {
	}

	distanceTo(target: VoronoiPoint) {
		return Math.sqrt(
			Math.pow(this.x - target.x, 2) +
			Math.pow(this.y - target.y, 2)
		);
	}
}