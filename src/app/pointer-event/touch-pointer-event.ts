import {PointerEvent} from "./pointer-event";
import {Point} from "../common/point";


export class TouchPointerEvent implements PointerEvent{

	position:Point;

	public constructor(
		public event: any,
		public touchEventId: number
	){
		this.position = new Point(
			event.clientX,
			event.clientY
		);
	}


	vectorTo(event:any):Point {
		return new Point(
			event.targetTouches[this.touchEventId].pageX - this.position.x,
			this.position.y - event.targetTouches[this.touchEventId].pageY
		);
	}
}