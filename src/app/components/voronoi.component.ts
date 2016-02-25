import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {HostListener} from "angular2/core";
import {VoronoiDiagram} from "../geometry-manager/voronoi/voronoi-diagram";
import {Dimension} from "../geometry-manager/common/dimension";
import {VoronoiBoard} from "../geometry-manager/voronoi/voronoi-board";
import {VoronoiRenderer} from "../geometry-manager/voronoi/voronoi-renderer";
import {Point} from "../geometry-manager/common/point";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "../audio/audio-service";
import {OnDestroy} from "angular2/core";


@Component({
	selector: 'voronoi',
	bindings: [FileDatastore]
})
@View({
	template: `<div (window:resize)="onResize($event)"></div>`,
	directives: []
})
export class VoronoiComponent implements OnInit, AfterViewInit , OnDestroy{

	// Input
	@Input() board: any;

	// Attributes
	private diagram: VoronoiDiagram;
	private renderer: VoronoiRenderer;
	private throttledResize;


	/**
	 * @param elementRef
     */
	constructor(
		private elementRef: ElementRef,
		private fileDatastore: FileDatastore,
		private audioService: AudioService
	) {}

	/**
	 * On init
	 * @returns {undefined}
     */
	ngOnInit():any {
		this.throttledResize = _.throttle(this.resizeHandler, 16);
	}

	/**
	 * After view init
     */
	ngAfterViewInit():any {
		this.createDiagram();
		this.renderer = new VoronoiRenderer(
			this.elementRef.nativeElement,
			this.diagram
		);
		this.renderer.render();
	}

	ngOnDestroy():any {
		this.renderer.stop();
	}

	/**
	 * On Mouse move
	 * @param event
	 */
	@HostListener('mousedown', ['$event'])
	@HostListener('touchstart', ['$event'])
	onClick(event) {
		event.preventDefault();
		event.stopPropagation();

		// Remove hovered flag
		for(let cell of this.diagram.getCells()) {
			cell.hovered = false;
		}

		// Position
		const clientX = event.clientX || (event.targetTouches ? event.targetTouches[0].clientX : 0)
		const clientY = event.clientY || (event.targetTouches ? event.targetTouches[0].clientY : 0)

		const x = clientX - this.elementRef.nativeElement.offsetLeft;
		const y = clientY - this.elementRef.nativeElement.offsetTop;

		// Look for hovered cell
		const cell = this.diagram.getCellAtPosition(new Point(x, y));
		if( ! cell) {
			return;
		}
		cell.hovered = true;

		// Play sound
		cell.play(this.fileDatastore, this.audioService);
	}


	/**
	 * On resize
	 * @param event
	 */
	onResize(event) {
		this.throttledResize();
	}

	/**
	 * Resize diagram
	 */
	private resizeHandler() {
		this.diagram.setDimension(this.getDimension());
		this.diagram.asyncRefresh();
	}

	/**
	 * Return DOM element dimension
	 * @returns {Dimension}
     */
	private getDimension():Dimension {
		return new Dimension(
			this.elementRef.nativeElement.offsetWidth,
			this.elementRef.nativeElement.offsetHeight
		);
	}

	/**
	 * Create voronoi diagram
	 */
	private createDiagram() {
		this.diagram = new VoronoiDiagram(this.getDimension());
		new VoronoiBoard(this.diagram, this.board);
		this.diagram.initialize();
	}

}
