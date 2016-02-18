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
		this.two.width = width;
		this.two.height = height;
		this.voronoiBoard.dimension = new Dimension(
			width,
			height
		);
	}

	/**
	 * After view init
	 */
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

		this.voronoiBoard.diagram.relaxCells();
		window.requestAnimationFrame(() => this.render());
	}


	/**
	 * Render loop
	 */
	render() {
		this.two.clear();
const scaleRatio = 0.95;
		// Cells path
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

			const outer = new Two.Path(anchors, true, false);
			outer.scale = scaleRatio;
			outer.fill = '#00B2B2';
			outer.opacity = 0.5;
			outer.translation.set(cell.x * (1-scaleRatio), cell.y * (1-scaleRatio));
			this.two.add(outer);
		}

		// Update view
		this.two.update();

		// Request next frame
		window.requestAnimationFrame(() => this.render());
	}

}
