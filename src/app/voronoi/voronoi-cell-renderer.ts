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
		this.label.fillColor = '#575757';

		//noinspection TypeScriptUnresolvedVariable
		this.label.content = cell.getCell().title.toUpperCase();
		this.label.fontFamily = 'Roboto Condensed';
		this.label.fontWeight = 700;
		this.label.bringToFront();

		this.updatePath();
	}

	public updatePath() {
		const center = new this.paper.Point(this.cell.getPosition());

		this.label.position = center;

		this.path.removeSegments();
		this.path.fillColor = '#FFFFFF';
		this.path.strokeColor= '#00DBDB';
		this.path.strokeJoin = 'round';
		this.path.strokeWidth = 1;
		for(let point of this.cell.getPath()) {
			const paperPoint = new this.paper.Point(point);

			this.path.add({
				point: paperPoint,
			});
		}

		this.path.closed = true;
		this.label.fontSize = ~~(Math.min(this.path.bounds.width * 1.30 / this.label.content.length, 28));
	}

}