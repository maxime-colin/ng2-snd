import {PointerEvent} from "./pointer-event";
import {Point} from "../common/point";

export class MousePointerEvent implements PointerEvent{
	position: Point;

	public constructor(
		public event
	){
		this.position = new Point(
			event.clientX,
			event.clientY
		);
	}

	public vectorTo(event:any):Point {
		return new Point(
			event.pageX - this.position.x,
			this.position.y - event.pageY
		);
	}
}
