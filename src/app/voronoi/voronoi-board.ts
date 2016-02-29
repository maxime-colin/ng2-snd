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
    private populateFromBoard() {
        const cells: VoronoiCell[] = [];
        let i = 2;
        let length = _.size(this.board.tiles);

        _.each(this.board.tiles, (tile) => {
            i++;
            cells.push(
                new VoronoiCell(
                    tile,
                   // Point.random(this.diagram.getDimension())
                    new Point(
                        Math.round(this.diagram.getDimension().width  * i / (length  +2)),
                        Math.round(this.diagram.getDimension().height * i / (length  +2))
                    )
                )
            );
        });
        this.diagram.setVoronoiCells(cells);
    }


}
