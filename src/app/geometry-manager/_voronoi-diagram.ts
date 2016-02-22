//import {Point} from '../helpers/point';
//import {VoronoiCell} from '../helpers/voronoi-cell';
//import {Dimension} from '../helpers/dimension';
//
//export class _VoronoiDiagram {
//
//	private _diagram: any;
//	private _voronoi: any;
//	private _quadTree: any;
//	public throttledRelaxCellsMultiple: Function;
//
//
//	constructor(
//		public cells: Array<VoronoiCell>,
//		private _dimension: Dimension
//	) {
//		this._voronoi = new Voronoi();
//	}
//
//	get dimension(): Dimension {
//		return this._dimension;
//	}
//
//	set dimension(dimension: Dimension) {
//		this._dimension = dimension;
//		this.relaxCellsMultiple();
//		this._buildTreeMap();
//	}
//
//	public getCellAtPosition(position: Point) {
//	//	const items = this._quadTree.retrieve(position);
//		for(let itemId in this.cells) {
//			let item = this.cells[itemId];
//			if(item.pointIntersection(position)) {
//				//console.log(item);
//			}
//		}
//		return false;
//	}
//
//	public compute(): void {
//		this._calculateVoronoiDiagram();
//		this._updateCellsPath();
//		this.relaxCellsMultiple();
//		this._buildTreeMap();
//	}
//
//
//	public relaxCells() {
//		this._replacePointWithCentroid();
//		this._ratioConstraint();
//		this._keepCellsInBounds();
//		this._calculateVoronoiDiagram();
//		this._updateCellsPath();
//		this._buildTreeMap();
//	}
//
//	public relaxCellsMultiple() {
//		_.times(100, () => this.relaxCells());
//	}
//
//	private _updateCellsPath(): void {
//		for(let cellId in this._diagram.cells) {
//			let cell = this._diagram.cells[cellId];
//			let path:Array<Point> = [];
//			for (const halfedgeId in cell.halfedges) {
//				const halfedge = cell.halfedges[halfedgeId];
//				path.push(new Point(
//					halfedge.getStartpoint().x,
//					halfedge.getStartpoint().y
//				));
//			}
//			(<VoronoiCell>cell.site).path = path;
//		}
//	}
//
//	private _calculateVoronoiDiagram(): void {
//
//		let bbox = {
//			xl: 0,
//			xr: this._dimension.width,
//			yt: 0,
//			yb: this._dimension.height
//		};
//
//		this._diagram = this._voronoi.compute(this.cells, bbox);
//	}
//
//
//	private _replacePointWithCentroid() {
//		for(const cellId in this.cells) {
//			const cell = this.cells[cellId];
//			cell.position = cell.centroidPosition();
//		}
//	}
//
//
//	private _keepCellsInBounds():void {
//		for(const cellId in this.cells) {
//			const cell = this.cells[cellId];
//			cell.position.x = Math.min(cell.position.x, this.dimension.width - 10);
//			cell.position.y = Math.min(cell.position.y, this.dimension.height - 10);
//		}
//	}
//
//	private _ratioConstraint():void {
//
//		if(this.cells.length <= 1) {
//			return
//		}
//
//		let minRatio = Infinity;
//
//		for(const cellId in this.cells) {
//			const cell = this.cells[cellId];
//			const boundingBox = cell.boundingBox();
//			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);
//
//			minRatio = Math.min(minRatio, ratio);
//		}
//
//		if(minRatio < 1.5){
//			return;
//		}
//
//		for(const cellId in this.cells) {
//			const cell = this.cells[cellId];
//			const boundingBox = cell.boundingBox();
//			const ratio = (boundingBox[1].x - boundingBox[0].x) / (boundingBox[1].y - boundingBox[0].y);
//
//			if(ratio > 1.5) {
//				cell.position.x += 	(boundingBox[1].x - boundingBox[0].x) * (Math.random() - 0.5) / 3;
//				cell.position.y += 	(boundingBox[1].y - boundingBox[0].y) * (Math.random() - 0.5) / 3;
//			}
//		}
//	}
//
//	private _buildTreeMap() {
//		const bounds = {
//			x:0,
//			y:0,
//			width: this._dimension.width,
//			height: this._dimension.height
//		};
//		this._quadTree = new QuadTree(bounds);
//
//		// Insert cells in quad tree
//		_.each(this.cells, cell => {
//			const bbox = cell.boundingBox();
//			this._quadTree.insert({
//				x: bbox[0].x,
//				y: bbox[0].y,
//				width: bbox[1].x - bbox[0].x,
//				height: bbox[1].y - bbox[0].y,
//				cell: cell
//			});
//		});
//	}
//}