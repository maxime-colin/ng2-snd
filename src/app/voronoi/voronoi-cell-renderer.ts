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

		let title = cell.getCell().title;
		//titleLines = title.split(' ');


		//noinspection TypeScriptUnresolvedVariable
		this.label.content = title.toUpperCase();
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
		//this.path.strokeColor= '#00DBDB';
		//this.path.strokeJoin = 'round';
		//this.path.strokeWidth = 1;


		let path = this.cell.getPath();
		let pathLength = path.length;
		let padding = 5;

		for(let pointId = 0; pointId < pathLength; pointId++) {

			let nextPointId = (pointId + pathLength + 1) % pathLength;
			let previousPointId = (pointId + pathLength - 1) % pathLength;

			let previousPoint 	= new this.paper.Point(path[previousPointId]);
			let point 			= new this.paper.Point(path[pointId]);
			let nextPoint 		= new this.paper.Point(path[nextPointId]);
			let vector = (previousPoint.subtract(nextPoint)).normalize(padding);
			let newPoint = point.clone();


			let perpendicular = vector.clone();
			perpendicular.angle += 90;
			newPoint = newPoint.add(perpendicular);

			this.path.add({
				point: newPoint.add(previousPoint.subtract(newPoint).normalize(10)),
				handleOut: previousPoint.subtract(newPoint).normalize(-10),
			});


			this.path.add({
				point: newPoint.add(nextPoint.subtract(newPoint).normalize(10)),
				handleIn: nextPoint.subtract(newPoint).normalize(-10),
			});

			//var shape = new this.paper.Shape.Circle(newPoint.add(previousPoint.subtract(newPoint).normalize(10)), 1);
			//shape.fillColor = 'red';
			//
			//var shape = new this.paper.Shape.Circle(newPoint.add(nextPoint.subtract(newPoint).normalize(10)), 1);
			//shape.fillColor = 'blue';
			//
			//var shape = new this.paper.Shape.Circle(point, 1);
			//shape.fillColor = 'green';
		}
	//	this.removeSmallBits(this.path);
		this.path.closed = true;
		this.label.fontSize = ~~(Math.min(this.path.bounds.width * 1.30 / this.label.content.length, 28));
	}

	public removeSmallBits(path) {
		var averageLength = path.length / path.segments.length;
		var min = path.length / 35;
		for (var i = path.segments.length - 1; i >= 0; i--) {
			var segment = path.segments[i];
			var cur = segment.point;
			var nextSegment = segment.next;

			if( ! nextSegment) {
				continue;
			}

			var next = nextSegment.point.add(nextSegment.handleIn);
			if (cur.getDistance(next) < min) {
				segment.remove();
			}
		}
	}


}