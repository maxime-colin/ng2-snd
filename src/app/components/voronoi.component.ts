import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {Point} from '../helpers/point';

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

	two: any;
	dom: any;
	diagram: any;
	height: number;
	width: number;
	points: Array<Point> = [];
	
	constructor(
		private _elementRef: ElementRef
	) {}


	ngOnInit() {
		console.log(this.board);

		this.dom = this._elementRef.nativeElement;
		this.updateContainerSize();


	}

	onResize(event) {
		this.updateContainerSize();
	}

	updateContainerSize() {
		console.log('resize');
		this.height = this.dom.offsetHeight;
		this.width = this.dom.offsetWidth;
	}


	ngAfterViewInit() {

		// Point
		let tileCount = Object.keys(this.board.tiles).length;
		for (var i = 0; i < tileCount; ++i) {
			this.points.push({
				x: Math.random() *  this.width,
				y: Math.random() *  this.height,
				ref: Math.random(),
				path: null
			});
		}



		// Two
		let params = {
			width: this.width,
			height: this.height,
			type: Two.Types.canvas,
		};
		this.two = new Two(params).appendTo(this.dom);

	
		this.calculateVoronoi();


		this.two.bind('update', this.render.bind(this)).play();
	}

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

	render(frameCount) {

		this.two.clear();
		this.two.width = this.width;
		this.two.height = this.height;


		// Voronoi Diagram
		this.calculateVoronoi();

		for (let i in this.points) {
			let point = this.points[i];
			var circle = this.two.makeCircle(point.x, point.y, 10);
			circle.fill = '#FF8000';
		}

		for (var i = 0; i < this.diagram.cells.length; i++) {
			var anchors = [];
			var cell = this.diagram.cells[i];
			for (var j = 0; j < cell.halfedges.length; ++j) {
				let halfedge = cell.halfedges[j];
				anchors.push(new Two.Anchor(
					halfedge.getStartpoint().x,
					halfedge.getStartpoint().y
				));
			}
	
			var outer = new Two.Path(anchors, false, false);
			outer.fill = '#00B2B2';
			outer.opacity = 0.5;

			cell.site.path = outer;

			this.two.add(outer);
		};


		for (var cellId in this.diagram.cells){
			let cell = this.diagram.cells[cellId];

			var center = this.get_polygon_centroid(cell.site.path.vertices);
			cell.site.x = center.x;
			cell.site.y = center.y;
		}
	}


	calculateVoronoi() {
		var voronoi = new Voronoi();
		var bbox = {xl: 0, xr: this.width, yt: 0, yb: this.height};
		var sites = this.points;
		this.diagram = voronoi.compute(sites, bbox);


	}
}