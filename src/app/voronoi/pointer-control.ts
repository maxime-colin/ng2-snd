import {Point} from "../common/point";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "../audio/audio-service";
import {VoronoiCell} from "./voronoi-cell";
import {Renderer} from "angular2/core";
import {AudioPlayerFactory} from "../audio/audio-player-factory";
import {AudioPlayer} from "../audio/audio-player";


export class PointerControl {
	private eventCanceller;
	private audioPlayer: AudioPlayer;
	private clickPosition: Point;


	public constructor(
		private cell: VoronoiCell,
		private audioPlayerFactory: AudioPlayerFactory,
		private renderer: Renderer
	) {}

	public onTouch(position: Point) {
		this.clickPosition = position;
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
		var currentPosition = {
			x: event.pageX || (event.targetTouches ? event.targetTouches[0].pageX : 0),
			y: event.pageY || (event.targetTouches ? event.targetTouches[0].pageY : 0)
		};
		var deltaY = (this.clickPosition.y - currentPosition.y);
		var deltaX = (currentPosition.x - this.clickPosition.x);

		// Playback rate
		var playbackRate = (Math.max(deltaX, -200) / 200) + 1;
		playbackRate = Math.max(0.2, playbackRate);
		this.audioPlayer.setPlaybackRate(playbackRate);
		
		
		// Detune
		var detune = (deltaY / 200) * 1200;
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