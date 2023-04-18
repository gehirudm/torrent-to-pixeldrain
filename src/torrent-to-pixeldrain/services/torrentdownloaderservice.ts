import WebTorrent = require('webtorrent');
import { DownloadedTorrent } from '../interfaces/downloadedtorrent';
import * as superchargedFs from '@supercharge/fs'

export class TorrentDownloaderService {
    private torrentClient: WebTorrent.Instance;
    private verbose:boolean;

    constructor(verbose: boolean = false) {
        this.torrentClient = new WebTorrent();
        this.verbose = verbose;
    }

    public download(pathToTorrent: string, outPath: string): Promise<DownloadedTorrent> {
        return new Promise<DownloadedTorrent>(async (resolve, reject) => {
            if (outPath != "") {
                await superchargedFs.ensureDir(outPath);
            }
            this.torrentClient.add(pathToTorrent, { path: outPath }, torrent => {
                torrent.on('done', () => {
                    resolve({
                        sucess: true,
                        name: torrent.name,
                        fileCount: torrent.files.length,
                        downloadedPath: outPath,
                        filePath: torrent.files.length == 1 ? `${outPath}/${torrent.files[0].path}` : undefined
                    })
                    torrent.destroy();
                })

                torrent.on('error', (err) => resolve({
                    sucess: false,
                    error: err,
                    id: pathToTorrent
                }))

                if (this.verbose) {
                    torrent.on('download', () => {
                        if (((torrent.progress * 100) % 5) < 1) {
                            console.log('progress: ' + torrent.progress * 100 + '%')   
                        }
                    })
                }
            })

            this.torrentClient.on("error", reject);
        })
    }
}