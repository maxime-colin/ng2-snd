import {Point} from "../common/point";

export interface PointerEvent {
	position: Point;
	vectorTo(event:any):Point;
}