import { Torrent } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";

export class MagnetLink implements Torrent {
    input: string;
    output?: string;

    pixeldrainService: PixeldrainService;
    private torrentDownloadService: TorrentDownloaderService;
    
    constructor(torrentDownloadService: TorrentDownloaderService) {
        this.torrentDownloadService = torrentDownloadService;
    }
    
    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            
        })
    }
}