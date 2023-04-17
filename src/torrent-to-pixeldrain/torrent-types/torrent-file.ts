import { TorrentType } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";

export class TorrentFile implements TorrentType {
    fileLocation: string;
    pixeldrainService: PixeldrainService;
    
    constructor(fileLocation: string) {
        this.fileLocation = fileLocation;
    }

    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

        })
    }
}