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
        } else if (typeof webkitAudioContext !== "undefined") {
            this.context = new webkitAudioContext();
        } else {
            alert('AudioContext not supported. :(');
        }
    }


    /**
     * Play
     */
    public play(destination, source, raw) {
        this.context.decodeAudioData(raw, (buffer) => {
        // Check buffer
        if (!buffer) {
            alert('failed to decode: buffer null');
            return;
        }

        // Create a sound source
        source.buffer = buffer;
        source.connect(destination);
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
            byteString = decodeURI(dataURI.split(',')[1]);

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



    public playFromDataURL(blob){

        if( ! blob) {
            return;
        }

        // Recreate AudioContext if needed
        if(new Date().getTime() - this.lastPlayed > 30000){
            this.createContext();
        }
        this.lastPlayed = new Date().getTime();

        // Create source
        var source = this.context.createBufferSource();

        // Play blob
        this.play(this.context.destination, source, blob);

        return {source : source};
    }

}