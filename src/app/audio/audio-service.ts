import {unescape} from "querystring";
export class AudioService {

    private context;
    private lastPlayed;


    constructor() {
        console.log('AudioService constructor');
        this.lastPlayed = new Date().getTime();
        this.createContext();
    }


    private createContext() {

        if(this.context) {
            this.context.close();
        }

        if (typeof AudioContext !== "undefined") {
            this.context = new AudioContext();
        } else { //noinspection TypeScriptUnresolvedVariable
            if (typeof webkitAudioContext !== "undefined") {
                //noinspection TypeScriptUnresolvedFunction
                this.context = new webkitAudioContext();
            } else {
                alert('AudioContext not supported. :(');
            }
        }
    }


    /**
     * Play
     */
    public play(source, filter, raw) {
        this.context.decodeAudioData(raw, (buffer) => {
        // Check buffer
        if (!buffer) {
            alert('failed to decode: buffer null');
            return;
        }

        // Create a sound source
        source.buffer = buffer;

        // Connecter la source au this.context
        //source.connect(filter);
        //filter.connect(this.context.destination);
        source.connect(this.context.destination);

        source.start(0);

    },  (error) => {
        console.error("failed to decode:", error);
    });

}

    public  dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }



    public blobToArrayBuffer (blob, callback){
        var uint8ArrayNew  = null;
        var arrayBufferNew = null;
        var fileReader     = new FileReader();
        fileReader.onload  = (progressEvent) => {
            callback(fileReader.result);
        };
        fileReader.readAsArrayBuffer(blob);
    }



    public playFromDataURL(audioDataURL){

        if( ! audioDataURL) {
            return;
        }

        // Recreate AudioContext if needed
        if(new Date().getTime() - this.lastPlayed > 30000){
            this.createContext();
        }
        this.lastPlayed = new Date().getTime();

        // Create source
        var source = this.context.createBufferSource();

        // Create filter
        var filter = this.context.createBiquadFilter();
        /*
         // Create and specify parameters for the low-pass filter.
         filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
         filter.frequency.value = 44000; // Set cutoff to 440 HZ
         */

        // Play blob
        var blob = this.dataURItoBlob(audioDataURL);
        this.blobToArrayBuffer(blob, (arrayBuffer) =>{
            this.play(source, filter, arrayBuffer);
        });

        return {source : source, filter : filter};
    }

}