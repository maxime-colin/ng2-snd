import {Injectable} from "angular2/core";
import {FileDatastore} from "../services/file-datastore";
import {AudioService} from "./audio-service";
import {Cell} from "../board/models/cell";
import {AudioPlayer} from "./audio-player";

@Injectable()
export class AudioPlayerFactory {

	public constructor(
		private audioService: AudioService
	) {}

	public getPlayer(cell: Cell) {
		return new AudioPlayer(
			cell,
			this.audioService
		);
	}
}

