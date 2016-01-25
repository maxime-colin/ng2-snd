import {Point} from '../helpers/point';
import {VoronoiCell} from '../helpers/voronoi-cell';
import {VoronoiDiagram} from '../helpers/voronoi-diagram';
import {Dimension} from '../helpers/dimension';

export class VoronoiBoard {

	two: any;
	dom: any;
	diagram: VoronoiDiagram;
	cells: Array<VoronoiCell> = [];


	constructor(
		private _board: any,
		private _dimension: Dimension
	) {
		this._populateFromBoard(_board);
		this._scatterCells();
		this.diagram = new VoronoiDiagram(this.cells, this._dimension);

		this.diagram.compute();
	}

	get dimension(): Dimension {
		return this._dimension;
	}

	set dimension(dimension: Dimension) {
		this._dimension = dimension;
	}

	private _populateFromBoard(board): void {
		for(let cellId in board.tiles) {
			this.cells.push(new VoronoiCell(board.tiles[cellId]));
		}
	}

	private _scatterCells(): void {
		for (let cellId in this.cells) {
			this.cells[cellId].position = this._getRandomPoint();
		}
	}

	private _getRandomPoint(): Point {
		return {
			x : Math.floor(Math.random() *  this.dimension.width),
			y : Math.floor(Math.random() *  this.dimension.height)
		}
	}

}