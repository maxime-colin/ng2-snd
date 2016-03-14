import {Renderer} from "angular2/core";

import {Point} from "../common/point";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "../audio/audio-service";
import {VoronoiCell} from "./voronoi-cell";
import {AudioPlayerFactory} from "../audio/audio-player-factory";
import {AudioPlayer} from "../audio/audio-player";
import {PointerEvent} from "../pointer-event/pointer-event";


export class PointerControl {
	private eventCanceller;
	private audioPlayer: AudioPlayer;
	private pointerEvent: PointerEvent;


	public constructor(
		private cell: VoronoiCell,
		private audioPlayerFactory: AudioPlayerFactory,
		private renderer: Renderer
	) {}

	public onTouch(pointerEvent: PointerEvent) {
		this.pointerEvent = pointerEvent;
		this.cell.clicked = true;
		this.cell.highlight = 1.0;

		this.eventCanceller = [
			this.renderer.listenGlobal('window', 'mousemove', (event) => this.onDragHandler(event)),
			this.renderer.listenGlobal('window', 'touchmove', (event) => this.onDragHandler(event)),
			this.renderer.listenGlobal('window', 'mouseup', (event) => this.onMouseUpHandler(event)),
			this.renderer.listenGlobal('window', 'touchend', (event) => this.onMouseUpHandler(event)),
		];


		// Play sound
		this.audioPlayer = this.audioPlayerFactory.getPlayer(this.cell.getCell());
		this.audioPlayer.play();
	}

	private onDragHandler(event):any {

		let vector = this.pointerEvent.vectorTo(event);

		// Playback rate
		var playbackRate = (Math.max(vector.x, -200) / 200) + 1;
		playbackRate = Math.max(0.2, playbackRate);
		this.audioPlayer.setPlaybackRate(playbackRate);
		
		
		// Detune
		var detune = (vector.y / 200) * 1200;
		detune = Math.max(-1200, detune);
		detune = Math.min(1200, detune);
		this.audioPlayer.setDetune(detune);
	}

	private onMouseUpHandler(event):any {
		for(let eventCancel of this.eventCanceller) {
			eventCancel();
		}
	}
}