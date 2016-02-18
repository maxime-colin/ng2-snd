import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {VoronoiPoint} from '../helpers/point';
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
	throttledResize: Function;
	paper: any

	/**
	 * Constructor
	 * @param _elementRef
     */
	constructor(
		private _elementRef: ElementRef
	) {
		this.throttledResize = _.throttle(this.resizeHandler, 16);
	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.dom = this._elementRef.nativeElement;
	}

	/**
	 * On resize
	 * @param event
     */
	onResize(event) {
		this.throttledResize();
	}

	/**
	 * Resize handler
	 */
	resizeHandler() {
		const width = this.dom.offsetWidth;
		const height = this.dom.offsetHeight;
		this.voronoiBoard.dimension = new Dimension(
			width,
			height
		);
	}

	/**
	 * After view init
	 */
	ngAfterViewInit() {

		// Voronoi board (model)
		this.voronoiBoard = new VoronoiBoard(
			this.board,
			new Dimension(
				this.dom.offsetWidth,
				this.dom.offsetHeight
			)
		);

		// Two
		//let params = {
		//	width: this.dom.offsetWidth,
		//	height: this.dom.offsetHeight,
		//	type: Two.Types.canvas,
		//};

	//	this.two = new Two(params).appendTo(this.dom);

		// Create paper
		var canvas = document.createElement('canvas');
		this.dom.appendChild(canvas);
		canvas.setAttribute('resize', 'true');
		this.paper = new paper.PaperScope();
		this.paper.setup(canvas);


		this.voronoiBoard.diagram.relaxCells();
		window.requestAnimationFrame(() => this.render());
	}


	/**
	 * Render loop
	 */
	render() {
		this.paper.project.activeLayer.children = [];
		var spotColor = '#00B2B2';

		var background = new this.paper.Shape.Rectangle({
			rectangle: this.paper.view.bounds,
			fillColor: '#111111'
		});

		//this.two.clear();
		//const scaleRatio = 0.95;
		//// Cells path
		for (const i in this.voronoiBoard.cells) {
			const cell = this.voronoiBoard.cells[i];
			const path = new this.paper.Path();
			const center = new this.paper.Point(cell.position);
			path.fillColor = spotColor;
			path.closed = true;

			for (var pointId = 0; pointId < cell.path.length; pointId++) {
				const point = new this.paper.Point(cell.path[pointId]);
				//const next = new this.paper.Point(cell.path[(pointId + 1) == cell.path.length ? 0 : pointId + 1]);
				//const vector = (next.subtract(point)).divide(2);

				const vectorToCenter = center.subtract(point);
				const paddingVector = vectorToCenter.normalize(3);

				path.add({
					point: point.add(paddingVector),
					//handleIn: vector.multiply(-0.5),
					//handleOut: vector.multiply(0.5),
				});
			}

			//path.scale(0.95);

		}

		this.paper.view.draw();

		//	const anchors = [];
		//	for (const pointId in cell.path) {
		//		const point = cell.path[pointId];
		//		anchors.push(new Two.Anchor(
		//			point.x,
		//			point.y
		//		));
		//	}
        //
		//	const outer = new Two.Path(anchors, true, false);
		//	outer.scale = scaleRatio;
		//	outer.fill = '#00B2B2';
		//	outer.opacity = 0.5;
		//	outer.translation.set(cell.x * (1-scaleRatio), cell.y * (1-scaleRatio));
		//	this.two.add(outer);
		//}
        //
		//// Update view
		//this.two.update();

		// Request next frame
		window.requestAnimationFrame(() => this.render());
	}

	createPath(cell) {

	}

}
