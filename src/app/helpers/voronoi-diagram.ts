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

	public compute(): void {
		this._calculateVoronoiDiagram();
		this._updateCellsPath();
	}


	private _updateCellsPath(): void {
		for(let cellId in this._diagram.cells) {

			let cell = this._diagram.cells[cellId];
			let path:Array<Point> = [];
			for (let halfedgeId in cell.halfedges) {
				let halfedge = cell.halfedges[halfedgeId];
				path.push({
					x : halfedge.getStartpoint().x,
					y: halfedge.getStartpoint().y
				});
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
		let sites = this.cells;

		this._diagram = this._voronoi.compute(sites, bbox);
	}
}