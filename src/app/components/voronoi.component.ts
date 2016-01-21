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
		this.height = this.dom.offsetHeight;
		this.width = this.dom.offsetWidth;
	}


	ngAfterViewInit() {

		// Point
		let tileCount = Object.keys(this.board.tiles).length;
		for (var i = 0; i < tileCount; ++i) {
			this.points.push(new Point(
				Math.random() *  this.width,
				Math.random() *  this.height
			));
		}

		// Voronoi Diagram
		this.calculateVoronoi();

		// Two
		let params = {
			width: this.width,
			height: this.height,
			type: Two.Types.canvas,
		};
		this.two = new Two(params).appendTo(this.dom);

		for (let i in this.points) {
			let point = this.points[i];
			console.log(point.x, point.y);
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
				anchors.push(new Two.Anchor(
					halfedge.getEndpoint().x,
					halfedge.getEndpoint().y
				));
			}
	
			var outer = new Two.Path(anchors, true, false);
			outer.fill = '#00B2B2';
			
			outer.opacity = 0.5;

			this.two.add(outer);
		};



		this.two.bind('update', this.render).play();
	}

	render(frameCount) {
		
	}


	calculateVoronoi() {
		var voronoi = new Voronoi();
		var bbox = {xl: 0, xr: this.width, yt: 0, yb: this.height};
		var sites = this.points;
		this.diagram = voronoi.compute(sites, bbox);

		console.log(this.diagram);

	}
}