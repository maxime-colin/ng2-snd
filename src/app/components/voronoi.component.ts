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
	throttledResize: Function;
	
	constructor(
		private _elementRef: ElementRef


	) {
		this.throttledResize = _.throttle(this.resizeHandler, 32);
	}

	ngOnInit() {
		this.dom = this._elementRef.nativeElement;
	}

	onResize(event) {
		this.throttledResize();
	}

	resizeHandler() {
		const width = this.dom.offsetWidth;
		const height = this.dom.offsetHeight;
		this.two.width = width;
		this.two.height = height;
		this.voronoiBoard.dimension = new Dimension(
			width,
			height
		);

		this.relax();
	}

	ngAfterViewInit() {

		this.voronoiBoard = new VoronoiBoard(
			this.board,
			new Dimension(
				this.dom.offsetWidth,
				this.dom.offsetHeight
			)
		);

		// Two
		let params = {
			width: this.dom.offsetWidth,
			height: this.dom.offsetHeight,
			type: Two.Types.canvas,
		};

		this.two = new Two(params).appendTo(this.dom);

		this.relax();
		window.requestAnimationFrame(() => this.render());
	}

	relax() {
		this.voronoiBoard.diagram.relaxCells();
	}

	render() {
		this.two.clear();


		// Voronoi Diagram

		for (let i in this.voronoiBoard.cells) {
			let point = this.voronoiBoard.cells[i];
			var circle = this.two.makeCircle(point.x, point.y, 10);
			circle.fill = '#FF8000';
		}

		for (const i in this.voronoiBoard.cells) {
			const cell = this.voronoiBoard.cells[i];
			const anchors = [];
			for (const pointId in cell.path) {
				const point = cell.path[pointId];
				anchors.push(new Two.Anchor(
					point.x,
					point.y
				));
			}

			const outer = new Two.Path(anchors, false, false);
			outer.fill = '#00B2B2';
			outer.opacity = 0.5;
			this.two.add(outer);

			// Rectangle
			const boundingBox = cell.boundingBox();
			const width = boundingBox[1].x - boundingBox[0].x;
			const height = boundingBox[1].y - boundingBox[0].y;
			var rectangle = this.two.makeRectangle(
				boundingBox[0].x + (width / 2),
				boundingBox[0].y + (height / 2),
				width,
				height
			);
			rectangle.noFill();
		}

		this.two.update();

		window.requestAnimationFrame(() => this.render());
	}

}
