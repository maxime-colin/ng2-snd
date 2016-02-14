import {Point} from '../helpers/point';
import {VoronoiCell} from '../helpers/voronoi-cell';
import {Dimension} from '../helpers/dimension';

export class VoronoiDiagram {

	private _diagram: any;
	private _voronoi: any;


	constructor(
		public cells: Array<VoronoiCell>,
		private _dimension: Dimension
	) {
		this._voronoi = new Voronoi();
	}


	get dimension(): Dimension {
		return this._dimension;
	}

	set dimension(dimension: Dimension) {
		this._dimension = dimension;
		this._keepCellsInBounds();
	}

	public compute(): void {
		this._calculateVoronoiDiagram();
		this._updateCellsPath();
	}


	public relaxCells() {
		this._replacePointWithCentroid();
		this._calculateVoronoiDiagram();
		this._updateCellsPath();
	}


	private _updateCellsPath(): void {
		for(let cellId in this._diagram.cells) {
			let cell = this._diagram.cells[cellId];
			let path:Array<Point> = [];
			for (const halfedgeId in cell.halfedges) {
				const halfedge = cell.halfedges[halfedgeId];
				path.push(new Point(
					halfedge.getStartpoint().x,
					halfedge.getStartpoint().y
				));
			}
			(<VoronoiCell>cell.site).path = path;
		}
	}


	private _calculateVoronoiDiagram(): void {
		if(this._diagram) {
			this._voronoi.recycle(this._diagram);
		}

		let bbox = {
			xl: 0,
			xr: this._dimension.width,
			yt: 0,
			yb: this._dimension.height
		};

		this._diagram = this._voronoi.compute(this.cells, bbox);
	}


	private _replacePointWithCentroid() {
		for(const cellId in this.cells) {
			const cell = this.cells[cellId];
			cell.position = cell.centroidPosition();
		}
	}


	private _keepCellsInBounds():void {
		for(const cellId in this.cells) {
			const cell = this.cells[cellId];
			cell.position.x = Math.min(cell.position.x, this.dimension.width);
			cell.position.y = Math.min(cell.position.y, this.dimension.height);
		}
	}
}