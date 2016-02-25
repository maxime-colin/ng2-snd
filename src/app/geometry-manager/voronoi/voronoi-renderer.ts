import {VoronoiDiagram} from "./voronoi-diagram";
import {VoronoiCellRenderer} from "./voronoi-cell-renderer";


export class VoronoiRenderer {

	private paper: any;
	private cellsRenderer: VoronoiCellRenderer[] = [];
	private cellColors = [
		'C8E6C9',
		'FFECB3',
		'F0F4C3',
		'F8BBD0',
		'FFCCBC',
		'D1C4E9',
		'DCEDC8',
		'BBDEFB',
		'B3E5FC',
		'B2EBF2',
		'B2DFDB',
		'C5CAE9',
		'FFF9C4',
		'E1BEE7',
		'FFE0B2',
	];


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
		let currentCellColorId = 0;

		for (let cell of this.diagram.getCells()) {
			cell.color = this.cellColors[currentCellColorId];
			this.cellsRenderer.push(new VoronoiCellRenderer(cell, this.paper));

			currentCellColorId = (currentCellColorId+1) % this.cellColors.length;
		}
	}

}