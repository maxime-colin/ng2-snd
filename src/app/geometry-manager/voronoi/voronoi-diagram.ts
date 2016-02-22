import {VoronoiCell} from "./voronoi-cell";
import {Dimension} from "../common/dimension";
import {Point} from "../common/point";


export class VoronoiDiagram {

	private cells: VoronoiCell[];
	private voronoi;


	constructor(
		private dimension: Dimension
	){
		this.voronoi = new Voronoi();
	}

	/**
	 * Set cells
	 * @param cells
	 */
	setCells(cells:any) {
		this.cells = cells;
	}

	/**
	 * Get cells
	 * @returns {VoronoiCell[]}
	 */
	getCells() {
		return this.cells;
	}

	/**
	 * Set dimensions
	 * @param dimension
	 */
	setDimension(dimension: Dimension) {
		this.dimension = dimension;
	}

	/**
	 * Get dimensions
	 * @returns {Dimension}
	 */
	getDimension() {
		return this.dimension;
	}

	/**
	 * Initialize
	 */
	initialize() {
		this.calculateDiagram();
		this.refresh();
	}

	/**
	 * Refresh (relax cells)
	 */
	refresh() {
		_.times(100, () => this.relaxCells());
	}

	/**
	 * Return cell at position
	 * @param position
	 */
	getCellAtPosition(position: Point) {
		for(let cell of this.cells) {
			if(cell.intersectPoint(position)) {
				return cell;
			}
		}

		return false;
	}

	/**
	 * Relax cells (one time)
	 */
	private relaxCells() {
		this.movePointToCentroid();
		this.ratioConstraint();
		this.keepCellsInBounds();
		this.calculateDiagram();
	}

	/**
	 * Calculate voronoi diagram
	 */
	private calculateDiagram(): void {
		let boundingBox = {
			xl: 0,
			xr: this.dimension.width,
			yt: 0,
			yb: this.dimension.height
		};

		const diagram = this.voronoi.compute(this.cells, boundingBox);

		// Calculate and inject path to cells
		for(let rawCell of diagram.cells) {
			(<VoronoiCell>rawCell.site).setPathFromHalfedges(rawCell.halfedges);
		}
	}


	/**
	 * Move cells to centroid
	 */
	private movePointToCentroid() {
		for(let cell of this.cells) {
			cell.moveToCentroid();
		}
	}

	/**
	 * Keep cells in bounds
	 */
	private keepCellsInBounds():void {
		for(let cell of this.cells) {
			const position = cell.getPosition();
			cell.setPosition(new Point(
				Math.min(position.x, this.dimension.width - 10),
				Math.min(position.y, this.dimension.height - 10)
			));
		}
	}

	/**
	 * Constraint : ratio < 1.5
	 */
	private ratioConstraint():void {

		if(this.cells.length <= 1) {
			return
		}

		let minRatio = Infinity;

		for(const cellId in this.cells) {
			const cell = this.cells[cellId];
			const boundingBox = cell.boundingBox();
			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);

			minRatio = Math.min(minRatio, ratio);
		}

		if(minRatio < 1.5){
			return;
		}

		for(let cell of this.cells) {
			const boundingBox = cell.boundingBox();
			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);
			const position = cell.getPosition();

			if(ratio > 1.5) {
				cell.setPosition(new Point(
					position.x + (boundingBox[1].x - boundingBox[0].x) * (Math.random() - 0.5) / 3,
					position.y + (boundingBox[1].y - boundingBox[0].y) * (Math.random() - 0.5) / 3
				))
			}
		}
	}
}