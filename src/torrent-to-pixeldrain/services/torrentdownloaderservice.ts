import WebTorrent = require('webtorrent');
import { DownloadedTorrent } from '../interfaces/downloadedtorrent';
import * as superchargedFs from '@supercharge/fs'

export class TorrentDownloaderService {
    private torrentClient: WebTorrent.Instance;

    constructor() {
        this.torrentClient = new WebTorrent();
    }

    public download(pathToTorrent: string, outPath: string, verbose: boolean = false): Promise<DownloadedTorrent> {
        return new Promise<DownloadedTorrent>(async (resolve, reject) => {
            if (outPath != "") {
                await superchargedFs.ensureDir(outPath);
            }
            this.torrentClient.add(pathToTorrent, { path: outPath }, torrent => {
                torrent.on('done', () => resolve({
                    sucess: true,
                    name: torrent.name,
                    fileCount: torrent.files.length,
                    downloadedPath: outPath,
                    filePath: torrent.files.length == 1 ? `${outPath}/${torrent.files[0].path}` : undefined
                }))

                torrent.on('error', (err) => resolve({
                    sucess: false,
                    error: err,
                    id: pathToTorrent
                }))

                if (verbose) {
                    torrent.on('download', () => {
                        // console.log('total downloaded: ' + torrent.downloaded)
                        // console.log('download speed: ' + torrent.downloadSpeed)
                        console.log('progress: ' + torrent.progress * 100 + '%')
                    })
                }
            })

            this.torrentClient.on("error", reject);
        })
    }
}