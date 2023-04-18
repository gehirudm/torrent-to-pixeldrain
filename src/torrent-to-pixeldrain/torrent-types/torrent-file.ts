import { Torrent } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";

import * as fs from 'fs';
import parseTorrent from 'parse-torrent';
import * as superchargedFs from '@supercharge/fs'
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";
import { TorrentToUplodable } from "../components/torrenttouploadable";

export class TorrentFile implements Torrent {
    input: string;
    output?: string;

    private torrentDownloadService: TorrentDownloaderService
    pixeldrainService: PixeldrainService;

    readonly MAIN_DOWNLOAD_FOLDER = "downloads";

    constructor(torrentDownloadService: TorrentDownloaderService) {
        this.torrentDownloadService = torrentDownloadService
    }

    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            let torrentName = parseTorrent(fs.readFileSync(this.input)).name
            let torrentNameAlt = superchargedFs.filename(this.input);

            let downloadLocation = this.output ? `/${this.output}/${torrentName ? torrentName : torrentNameAlt}` : `/${this.MAIN_DOWNLOAD_FOLDER}/${torrentName}`
            this.torrentDownloadService.download(this.input, downloadLocation)
                .then((torrent) => {
                    resolve(TorrentToUplodable.convert(torrent, this.pixeldrainService))
                })
                .catch(reject)
        })
    }
}