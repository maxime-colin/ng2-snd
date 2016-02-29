import {VoronoiCell} from "./voronoi-cell";
import {Dimension} from "../common/dimension";
import {Point} from "../common/point";
import {count} from "rxjs-es/operator/count";



export class VoronoiDiagram {

	private voronoiCell: VoronoiCell[];
	private voronoi;
	private refreshLoopTimer;
	private refreshLoopTimerIsRunning = false;


	constructor(
		private dimension: Dimension
	){
		this.voronoi = new Voronoi();
	}

	/**
	 * Set voronoiCells
	 * @param voronoiCells
	 */
	setVoronoiCells(voronoiCells:any) {
		this.voronoiCell = voronoiCells;
	}

	/**
	 * Get voronoiCells
	 * @returns {VoronoiCell[]}
	 */
	getVoronoiCells() {
		return this.voronoiCell;
	}

	/**
	 * Set dimensions
	 * @param dimension
	 */
	setDimension(dimension: Dimension) {
		this.dimension = dimension;
		this.calculateDiagram();
		this.keepCellsInBounds();
		this.calculateDiagram();
		this.refresh();
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
		let counter = 0;
		let delta = 0;
		do {
			delta = this.relaxCells();
			counter++;
		} while(delta > 0);
	}

	/**
	 * Return cell at position
	 * @param position
	 */
	getVoronoiCellAtPosition(position: Point): VoronoiCell {
		for(let voronoiCell of this.voronoiCell) {
			if(voronoiCell.intersectPoint(position)) {
				return voronoiCell;
			}
		}

		return null;
	}

	/**
	 * Relax cells (one time)
	 */
	public relaxCells() {
		const delta = this.movePointToCentroid();
		this.ratioConstraint();
		this.keepCellsInBounds();
		this.calculateDiagram();

		return delta;
	}

	/**
	 * Calculate voronoi diagram
	 */
	private calculateDiagram(): void {
		let boundingBox = {
			xl: -2,
			xr: this.dimension.width + 2,
			yt: -2,
			yb: this.dimension.height + 2
		};

		const diagram = this.voronoi.compute(this.voronoiCell, boundingBox);

		// Calculate and inject path to cells
		for(let rawCell of diagram.cells) {
			(<VoronoiCell>rawCell.site).setPathFromHalfedges(rawCell.halfedges);
		}
	}

	/**
	 * Move cells to centroid
	 */
	private movePointToCentroid() {
		let cumulativeDelta = 0;

		for(let cell of this.voronoiCell) {
			cumulativeDelta += cell.moveToCentroid();
		}
		return cumulativeDelta;
	}

	/**
	 * Keep cells in bounds
	 */
	private keepCellsInBounds():void {
		for(let cell of this.voronoiCell) {
			const position = cell.getPosition();
			cell.setPosition(new Point(
				Math.min(position.x, this.dimension.width),
				Math.min(position.y, this.dimension.height)
			));
		}
	}

	/**
	 * Constraint : ratio < 1.5
	 */
	private ratioConstraint():void {

		if (this.voronoiCell.length <= 1) {
			return
		}
		let minRatio = Infinity;
		let maxRatio = 0;

		for (const cellId in this.voronoiCell) {
			const cell = this.voronoiCell[cellId];
			const boundingBox = cell.boundingBox();
			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);

			minRatio = Math.min(minRatio, ratio);
			maxRatio = Math.max(maxRatio, ratio);
		}

		if (minRatio < 1.5) {
			return;
		}
		for (let cell of this.voronoiCell) {
			const boundingBox = cell.boundingBox();
			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);
			const position = cell.getPosition();

			if (ratio > 1.5) {
				cell.setPosition(new Point(
					position.x + (boundingBox[1].x - boundingBox[0].x) * (Math.random() - 0.5) / 3,
					position.y + (boundingBox[1].y - boundingBox[0].y) * (Math.random() - 0.5) / 3
				))
			}
		}
	}
}