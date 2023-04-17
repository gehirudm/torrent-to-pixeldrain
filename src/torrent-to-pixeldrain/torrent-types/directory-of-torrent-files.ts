import { TorrentType } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";
import { UploadableMultiTorrentDownloads } from "../uploadable-types/uploadablemultitorrent";
import { UploadableDirectory } from "../uploadable-types/uploadabledirectory";
import { UploadableFile } from "../uploadable-types/uploadablefile";
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";
import { DownloadedTorrent } from "../interfaces/downloadedtorrent";
import { PixeldrainService } from "../services/pixeldrainservice";

import * as fs from 'fs';
import parseTorrent from 'parse-torrent';

export class DirectoryOfTorrentFiles implements TorrentType {
    directoryLocation: string;
    torrentDownloadService: TorrentDownloaderService;
    readonly MAIN_DOWNLOAD_FOLDER = "downloads";
    pixeldrainService: PixeldrainService;

    constructor(directoryLocation: string, torrentDownloadService: TorrentDownloaderService) {
        this.directoryLocation = directoryLocation;
        this.torrentDownloadService = torrentDownloadService;
    }

    download(downloadPath?: string): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

            let torrentDownloadQueue: Promise<DownloadedTorrent>[] = []
            fs.readdirSync(this.directoryLocation).forEach(file => {

                let torrentName = parseTorrent(fs.readFileSync(`${this.directoryLocation}/${file}`)).name
                let torrentNameAlt = file.split(".")[0];

                let pathToTorrent = `${this.directoryLocation}/${file}`
                let downloadLocation = downloadPath ? `/${downloadPath}/${torrentName ? torrentName : torrentNameAlt}` : `/${this.MAIN_DOWNLOAD_FOLDER}/${torrentName}`

                torrentDownloadQueue.push(this.torrentDownloadService.download(pathToTorrent, downloadLocation))
            })

            const uploadable = new UploadableMultiTorrentDownloads();

            Promise.all(torrentDownloadQueue)
                .then((downloadedTorrents) => {
                    let sucessfullyDownloadedTorrents = downloadedTorrents.filter(torrent => {
                        if (!torrent.sucess) {
                            console.error(torrent.error)
                            return false;
                        }
                    })

                    sucessfullyDownloadedTorrents.forEach(torrent => {
                        if (torrent.fileCount > 1) {
                            uploadable.children.push(new UploadableDirectory(torrent.downloadedPath, torrent.name, this.pixeldrainService))
                        } else {
                            uploadable.children.push(new UploadableFile(torrent.filePath, torrent.name, this.pixeldrainService))
                        }

                    })

                    resolve(uploadable);
                })
                .catch(reject)
        })

    }
}