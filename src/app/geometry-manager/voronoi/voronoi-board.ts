

import {VoronoiDiagram} from "./voronoi-diagram";
import {VoronoiCell} from "./voronoi-cell";
import {Point} from "../common/point";
export class VoronoiBoard {

    constructor(
        private diagram: VoronoiDiagram,
        private board: any
    ){
        this.populateFromBoard();
    }

    /**
     * Create cells with board data
     */
    private populateFromBoard(): void {
        const cells: VoronoiCell[] = [];
        _.each(this.board.tiles, tile => {
            cells.push(
                new VoronoiCell(
                    tile,
                    Point.random(this.diagram.getDimension())
                )
            );
        });
        this.diagram.setCells(cells);
    }

}