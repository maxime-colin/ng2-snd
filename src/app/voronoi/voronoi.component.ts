import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {HostListener} from "angular2/core";
import {OnDestroy} from "angular2/core";

import {Point} from "../common/point";
import {Dimension} from "../common/dimension";

import {VoronoiDiagram} from "./voronoi-diagram";
import {VoronoiBoard} from "./voronoi-board";
import {VoronoiRenderer} from "./voronoi-renderer";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "../audio/audio-service";


@Component({
	selector: 'Voronoi',
	bindings: [FileDatastore]
})
@View({
	template: `<div (window:resize)="onResize($event)"></div>`
	,
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
	 * @param fileDatastore
	 * @param audioService
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
		this.throttledResize = _.throttle(this.resizeHandler, 250);
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

		// Remove clicked flag
		for(let cell of this.diagram.getVoronoiCells()) {
			cell.clicked = false;
		}

		// Position
		const clientX = event.clientX || (event.targetTouches ? event.targetTouches[0].clientX : 0)
		const clientY = event.clientY || (event.targetTouches ? event.targetTouches[0].clientY : 0)

		var componentBoundingBox = this.elementRef.nativeElement.getBoundingClientRect();
		const x = clientX - componentBoundingBox.left;
		const y = clientY - componentBoundingBox.top;

		// Look for clicked cell
		const cell = this.diagram.getVoronoiCellAtPosition(new Point(x, y));
		if( ! cell) {
			return;
		}
		cell.clicked = true;

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
		this.renderer.resize(this.getDimension());
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
