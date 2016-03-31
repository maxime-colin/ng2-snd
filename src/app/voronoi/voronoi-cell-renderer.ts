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
		title = this.splitHalf(title).join("\r\n");
		
		//noinspection TypeScriptUnresolvedVariable
		this.label.content = title.toUpperCase();
		this.label.fontFamily = 'Roboto Condensed';
		this.label.fontWeight = 700;
		this.label.bringToFront();

		this.updatePath();
	}

	private splitHalf(text:string):string[] {

		let splitted;

		if(text.indexOf(' ') == -1) {
			splitted = [text];
		}

		else if(text.indexOf(' ', text.indexOf(' ') + 1) == -1) {
			splitted = text.split(' ');
		}
		else {
			var p = text.slice(text.length/2.5).split(" ").slice(1).join(" ").length;
			let s1 = text.slice(0, text.length-p);
			let s2 = text.slice(text.length-p);

			splitted = [s1, s2];
		}

		splitted = _.filter(splitted, (item) => item);

		let minLength = _.min(_.map(splitted, line => line.length));
		if(minLength <= 1) {
			splitted = [splitted.join(' ')];
		}

		return splitted;
	}

	public updatePath() {
		const center = new this.paper.Point(this.cell.getPosition());

		this.label.position = center;

		this.path.removeSegments();

		if(this.cell.highlight == 1) {
			this.path.fillColor = new this.paper.Color('#00B2B2');
		}

		if(this.cell.highlight <= 0) {
			this.path.fillColor = new this.paper.Color('#FFFFFF');
		}

		if(this.cell.highlight > 0) {
			this.path.fillColor.lightness = 1 - (this.cell.highlight / 2);
			this.cell.highlight -= 16 / 250;
		}

		let path = this.cell.getPath();
		let pathLength = path.length;
		let padding = 5;


		for(let pointId = 0; pointId < pathLength; pointId++) {
			let nextPointId 			= (pointId + pathLength + 1) % pathLength;
			let point 					= new this.paper.Point(path[pointId]);
			let nextPoint 				= new this.paper.Point(path[nextPointId]);

			if((point.subtract(nextPoint)).length < 10) {
				path[nextPointId] = (point.add(nextPoint)).divide(2);
				path.splice(pointId, 1);
				pathLength -= 1;
			}
		}

		path = _.filter(path, item => item);
		pathLength = path.length;

		for(let pointId = 0; pointId < pathLength; pointId++) {

			let nextPointId 			= (pointId + pathLength + 1) % pathLength;
			let previousPointId 		= (pointId + pathLength - 1) % pathLength;
			let previousPoint 			= new this.paper.Point(path[previousPointId]);
			let point 					= new this.paper.Point(path[pointId]);
			let nextPoint 				= new this.paper.Point(path[nextPointId]);
			let nextToPreviousVector 	= previousPoint.subtract(nextPoint);
			let vector					= nextToPreviousVector.normalize(padding);
			let newPoint 				= point.clone();
			let radiusSize 				= 10;
			let perpendicular 			= vector.clone();
			perpendicular.angle += 90;

			newPoint = newPoint.add(perpendicular);

			let previousToCurrentVector = previousPoint.subtract(newPoint);
			let nextToCurrentVector = nextPoint.subtract(newPoint);
			let nextToCurrentRadiusSize = radiusSize;
			let previousToCurrentRadiusSize = radiusSize;


			if(previousToCurrentVector.length <= radiusSize) {
				previousToCurrentRadiusSize = 0;
			}
			if(nextToCurrentVector.length <= radiusSize) {
				nextToCurrentRadiusSize = 0;
			}

			let inPoint = newPoint.add(previousToCurrentVector.normalize(previousToCurrentRadiusSize));
			let outPoint = newPoint.add(nextToCurrentVector.normalize(nextToCurrentRadiusSize));
			this.path.add({
				point: inPoint,
				handleOut: previousToCurrentVector.normalize(-previousToCurrentRadiusSize),
			});
			this.path.add({
				point: outPoint,
				handleIn: nextToCurrentVector.normalize(-nextToCurrentRadiusSize),
			});

			//var shape = new this.paper.Shape.Circle(inPoint, 1);
			//shape.fillColor = 'red';
			//
			//var shape = new this.paper.Shape.Circle(outPoint, 1);
			//shape.fillColor = 'blue';
			//
			//var shape = new this.paper.Shape.Circle(point, 1);
			//shape.fillColor = 'green';
		}
	//	this.removeSmallBits(this.path);
		this.path.closed = true;

		let maxLineSize = _.max(_.map(this.label.content.split("\r\n"), text => text.length));

		this.label.fontSize = (Math.min(this.path.bounds.width * 1.30 / maxLineSize, 26));
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