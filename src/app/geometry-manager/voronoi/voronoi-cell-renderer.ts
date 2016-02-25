import {VoronoiCell} from "./voronoi-cell";

export class VoronoiCellRenderer {

	private path;
	private label;

	constructor(
		private cell: VoronoiCell,
		private paper
	) {
		this.path = new this.paper.Path();

		this.label = new this.paper.PointText(new this.paper.Point(10,10));
		this.label.justification = 'center';
		this.label.fillColor = 'black';
		//noinspection TypeScriptUnresolvedVariable
		this.label.content = cell.voronoiId;
		this.label.bringToFront();

		this.updatePath();

	}


	public updatePath() {
		const center = new this.paper.Point(this.cell.getPosition());

		this.label.position = center;

		this.path.removeSegments();
		//this.path.fillColor = '#FFFFFF';

		this.path.fillColor = '#' + this.cell.color;
		this.path.strokeColor= '#263238';
		this.path.strokeJoin = 'round';
		this.path.strokeWidth = 1;
		this.path.closed = true;

		for(let point of this.cell.getPath()) {
			const paperPoint = new this.paper.Point(point);
			const vectorToCenter = center.subtract(paperPoint);
		//	const paddingVector = vectorToCenter.normalize(3);

			this.path.add({
				point: paperPoint,
			});
		}
	}

}