import {VoronoiDiagram} from "./voronoi-diagram";
import {VoronoiCellRenderer} from "./voronoi-cell-renderer";
import {Dimension} from "./../common/dimension";


export class VoronoiRenderer {

	private paper: any;
	private cellsRenderer: VoronoiCellRenderer[] = [];
	private onFrameMethod = (event) => this.onFrame(event);


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
		this.paper.view.attach('frame', this.onFrameMethod);
		this.paper.view.draw();
		//console.log(this.paper.project.exportSVG({asString: true}));
	}

	public resize(dimension: Dimension) {
		this.paper.view.viewSize = new this.paper.Size(dimension.width, dimension.height);
		this.paper.view.draw();
	}

	public stop() {
		this.paper.view.detach('frame', this.onFrameMethod);
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
		for (let cell of this.diagram.getVoronoiCells()) {
			this.cellsRenderer.push(new VoronoiCellRenderer(cell, this.paper));
		}
	}

}