import { Torrent } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { UploadableMultiTorrentDownloads } from "../uploadable-types/uploadablemultitorrent";
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";
import { DownloadedTorrent } from "../interfaces/downloadedtorrent";
import { PixeldrainService } from "../services/pixeldrainservice";

import * as fs from 'fs';
import parseTorrent from 'parse-torrent';
import { TorrentToUplodable } from "../components/torrenttouploadable";

export class DirectoryOfTorrentFiles implements Torrent {
    input: string;
    output?: string;
    name?: string;

    private torrentDownloadService: TorrentDownloaderService;
    pixeldrainService: PixeldrainService;

    readonly MAIN_DOWNLOAD_FOLDER = "downloads";

    constructor(torrentDownloadService: TorrentDownloaderService) {
        this.torrentDownloadService = torrentDownloadService;
    }

    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

            let torrentDownloadQueue: Promise<DownloadedTorrent>[] = []
            fs.readdirSync(this.input).forEach((file, index) => {

                let parsedName = parseTorrent(fs.readFileSync(`${this.input}/${file}`)).name
                
                // If the torrent name can be parsed and a name is given
                //      <name> - <torrent name>
                // If the torrent name cannot be parsed but a name is given
                //      <name> - <index>
                // If a name is not given but a torrent name can be parsed
                //      <torrent name>
                // If a name is not give and torrent name cannot be parsed
                //      <file name>
                let torrentName =
                    this.name ?
                        this.name + " - " + parsedName ? parsedName : index
                        : parsedName

                let torrentNameAlt = file.split(".")[0];

                let pathToTorrent = `${this.input}/${file}`
                let downloadLocation = this.output ? `${this.output}/${torrentName ? torrentName : torrentNameAlt}` : `/${this.MAIN_DOWNLOAD_FOLDER}/${torrentName}`

                torrentDownloadQueue.push(this.torrentDownloadService.download(pathToTorrent, downloadLocation))
            })

            Promise.all(torrentDownloadQueue)
                .then((downloadedTorrents) => {
                    let sucessfullyDownloadedTorrents = downloadedTorrents.filter(torrent => {
                        if (!torrent.sucess) {
                            console.error(torrent.error)
                            return false;
                        }
                    })

                    const uploadable = new UploadableMultiTorrentDownloads();

                    sucessfullyDownloadedTorrents.forEach(torrent => {
                        resolve(TorrentToUplodable.convert(torrent, this.pixeldrainService))
                    })

                    resolve(uploadable);
                })
                .catch(reject)
        })

    }
}