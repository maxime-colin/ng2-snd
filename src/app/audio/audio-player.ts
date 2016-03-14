import {AudioService} from "./audio-service";
import {FileDatastore} from "../services/file-datastore";
import {Cell} from "../board/models/cell";
export class AudioPlayer {

	private audioPlayer;


	public constructor(
		public cell: Cell,
		public audioService: AudioService
	){}

	public play() {
		if( ! this.cell.audioLoaded) {
			return;
		}
		this.audioPlayer = this.audioService.playFromDataURL(this.cell.audioData);
	}

	public setDetune(detune: number) {
		if( ! this.audioPlayer) {
			return false;
		}
		this.audioPlayer.source.detune.value = detune;
	}

	public setPlaybackRate(playbackRate: number) {
		if( ! this.audioPlayer) {
			return false;
		}
		this.audioPlayer.source.playbackRate.value = playbackRate;
	}
	
}