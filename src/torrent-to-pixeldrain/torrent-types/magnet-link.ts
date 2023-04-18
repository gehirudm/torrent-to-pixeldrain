import { TorrentToUplodable } from "../components/torrenttouploadable";
import { Torrent } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";

import * as superchargedFs from '@supercharge/fs'
import parseTorrent from 'parse-torrent';

export class MagnetLink implements Torrent {
    input: string;
    output?: string;
    name?: string;

    pixeldrainService: PixeldrainService;
    private torrentDownloadService: TorrentDownloaderService;

    readonly MAIN_DOWNLOAD_FOLDER = "downloads";
    
    constructor(torrentDownloadService: TorrentDownloaderService) {
        this.torrentDownloadService = torrentDownloadService;
    }
    
    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

            let torrentName = parseTorrent(this.input).name
            let torrentNameAlt = this.name;

            let downloadLocation = this.output ? `/${this.output}/${torrentName ? torrentName : torrentNameAlt}` : `/${this.MAIN_DOWNLOAD_FOLDER}/${torrentName}`
            this.torrentDownloadService.download(this.input, downloadLocation)
                .then((torrent) => {
                    resolve(TorrentToUplodable.convert(torrent, this.pixeldrainService))
                })
                .catch(reject)
        })
    }
}