import {Component, View, OnInit, AfterViewInit, Input, ElementRef} from 'angular2/core';
import {HostListener} from "angular2/core";
import {VoronoiDiagram} from "../geometry-manager/voronoi/voronoi-diagram";
import {Dimension} from "../geometry-manager/common/dimension";
import {VoronoiBoard} from "../geometry-manager/voronoi/voronoi-board";
import {VoronoiRenderer} from "../geometry-manager/voronoi/voronoi-renderer";
import {Point} from "../geometry-manager/common/point";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "../audio/audio-service";


@Component({
	selector: 'voronoi',
	bindings: [FileDatastore, AudioService]
})
@View({
	template: `<div (window:resize)="onResize($event)"></div>`,
	directives: []
})
export class VoronoiComponent implements OnInit, AfterViewInit {

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


	/**
	 * On Mouse move
	 * @param event
	 */
	@HostListener('click', ['$event'])
	onClick(event) {
		for(let cell of this.diagram.getCells()) {
			cell.hovered = false;
		}
		const cell = this.diagram.getCellAtPosition(new Point(event.x, event.y));
		if(cell) {
			cell.hovered = true;
		}

		cell.play(this.fileDatastore, this.audioService);
	}


	/**
	 * On resize
	 * @param event
	 */
	onResize(event) {
		this.throttledResize();
	}

	private resizeHandler() {
		this.diagram.setDimension(this.getDimension());
		this.diagram.refresh();
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
