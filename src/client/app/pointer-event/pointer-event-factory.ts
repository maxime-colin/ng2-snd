import {Injectable} from "angular2/core";
import {TouchPointerEvent} from "./touch-pointer-event";
import {MousePointerEvent} from "./mouse-pointer-event";


@Injectable()
export class PointerEventFactory {

	public getPointerEvent(event) {

		if( event.targetTouches ) {
			var touchEventId = event.targetTouches.length - 1;
			const lastTouchEvent = event.targetTouches[touchEventId];
			return new TouchPointerEvent(lastTouchEvent, touchEventId);
		}

		else {
			return new MousePointerEvent(event);
		}
	}
}