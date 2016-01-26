import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {Point} from '../helpers/point';
import {Dimension} from '../helpers/dimension';
import {VoronoiBoard} from '../helpers/voronoi-board';

@Component({
	selector: 'voronoi',
	bindings: []
})
@View({
	template: `<div (window:resize)="onResize($event)"></div>`,
	directives: []
})
export class VoronoiComponent implements OnInit, AfterViewInit{
	
	@Input() board: any;
	
	voronoiBoard: VoronoiBoard;
	dom: any;
	two: any;
	
	
	constructor(
		private _elementRef: ElementRef
	) {}


	ngOnInit() {
		this.dom = this._elementRef.nativeElement;
	}

	onResize(event) {
		this.throttledResize();
	}

	throttledResize() {
		this.voronoiBoard.dimension = new Dimension(
			this.dom.offsetWidth,
			this.dom.offsetHeight
		);
	}

	ngAfterViewInit() {

		this.voronoiBoard = new VoronoiBoard(
			this.board,
			new Dimension(
				this.dom.offsetWidth,
				this.dom.offsetHeight
			)
		);

		// Point




		// Two
		let params = {
			width: this.dom.offsetWidth,
			height: this.dom.offsetHeight,
			type: Two.Types.canvas,
		};

		this.two = new Two(params).appendTo(this.dom);

		setInterval(() => {

			this.voronoiBoard.diagram.relaxCells();

			this.render();		
		}, 32);


		
	}


/*
	get_polygon_centroid(pts) {
	   var first = pts[0], last = pts[pts.length-1];
	   if (first.x != last.x || first.y != last.y) pts.push(first);
	   var twicearea=0,
	   x=0, y=0,
	   nPts = pts.length,
	   p1, p2, f;
	   for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
		  p1 = pts[i]; p2 = pts[j];
		  f = p1.x*p2.y - p2.x*p1.y;
		  twicearea += f;          
		  x += ( p1.x + p2.x ) * f;
		  y += ( p1.y + p2.y ) * f;
	   }
	   f = twicearea * 3;
	   return { x:x/f, y:y/f };
	}
*/
	render() {

		this.two.clear();


		// Voronoi Diagram

		for (let i in this.voronoiBoard.cells) {
			let point = this.voronoiBoard.cells[i];
			var circle = this.two.makeCircle(point.x, point.y, 10);
			circle.fill = '#FF8000';
		}

		for (let i in this.voronoiBoard.cells) {
			let cell = this.voronoiBoard.cells[i];
			let anchors = [];

			for (let pointId in cell.path) {
				let point = cell.path[pointId];
				anchors.push(new Two.Anchor(
					point.x,
					point.y
				));
			}
	
			var outer = new Two.Path(anchors, false, false);
			outer.fill = '#00B2B2';
			outer.opacity = 0.5;
			this.two.add(outer);
		};

		this.two.update();

	}

/*
	calculateBalancedVoronoi() {

		this.calculateVoronoi();

		for (var cellId in this.diagram.cells){
			let cell = this.diagram.cells[cellId];
			cell.site.x = Math.min(cell.site.x, this.width);
			cell.site.y = Math.min(cell.site.y, this.height);
		}

		this.calculateVoronoi();

		for (var iteration = 0; iteration < 50; ++iteration) {

			for (var cellId in this.diagram.cells){
				let cell = this.diagram.cells[cellId];
				let path = [];
				for (var j = 0; j < cell.halfedges.length; ++j) {
					let halfedge = cell.halfedges[j];
					path.push({
						x : halfedge.getStartpoint().x,
						y: halfedge.getStartpoint().y
					});
				}
				if(path.length == 0) {
					continue;
				}
				var center = this.get_polygon_centroid(path);
				cell.site.x = center.x;
				cell.site.y = center.y;
			}

			this.calculateVoronoi();
		}
		this.render();
	}




*/

}