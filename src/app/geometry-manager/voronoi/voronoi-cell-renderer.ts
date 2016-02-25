import {VoronoiCell} from "./voronoi-cell";
import {Path} from "../common/path";

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

		//this.path.fillColor = '#' + this.cell.color;
		this.path.fillColor = '#111111';
		this.path.strokeColor= '#00B2B2';
		this.path.strokeJoin = 'round';
		this.path.strokeWidth = 1;

		for(let point of this.cell.getPath()) {
			if(point.x < 1) point.x = -2;
			const paperPoint = new this.paper.Point(point);
			//const vectorToCenter = center.subtract(paperPoint);
			//const paddingVector = vectorToCenter.normalize(10);

			this.path.add({
				point: paperPoint,
		//		point: paperPoint.add(paddingVector),
			});
		}
		//this.path = Path.round(this.path, 25);

		this.path.closed = true;
	}

}