import {VoronoiDiagram} from "./voronoi-diagram";
import {VoronoiCellRenderer} from "./voronoi-cell-renderer";


export class VoronoiRenderer {

	private paper: any;
	private cellsRenderer: VoronoiCellRenderer[] = [];

	constructor(
		private domContainer: any,
		private diagram: VoronoiDiagram
	){
		this.createPaper();
		this.createCellsRenderer();
	}

	/**
	 * Create canvas + paper instance
	 */
	private createPaper():void {
		var canvas = document.createElement('canvas');
		this.domContainer.appendChild(canvas);
		canvas.setAttribute('resize', 'true');

		//noinspection TypeScriptUnresolvedFunction
		this.paper = new paper.PaperScope();
		this.paper.setup(canvas);
	}

	/**
	 * Render diagram
	 */
	public render() {
		this.paper.view.onFrame = (event) => this.onFrame(event);
		this.paper.view.draw();
	}

	private onFrame(event) {
		for(let cellRenderer of this.cellsRenderer) {
			cellRenderer.updatePath();
		}
	}

	/**
	 * Create cells renderer
	 */
	private createCellsRenderer():void {
		for (let cell of this.diagram.getCells()) {
			this.cellsRenderer.push(new VoronoiCellRenderer(cell, this.paper));
		}
	}

}