import { TorrentType } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";

export class MagnetLink implements TorrentType {
    magnetLink: string;
    pixeldrainService: PixeldrainService;

    constructor(magnetLink: string) {
        this.magnetLink = magnetLink;
    }
    
    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            
        })
    }
}