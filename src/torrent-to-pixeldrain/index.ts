import { TorrentType } from "./interfaces/torrenttype";
import { Uploadable } from "./interfaces/uploadable";
import { PixeldrainService } from "./services/pixeldrainservice";

export class TorrentToPixeldrain {
    torrent: TorrentType;

    constructor(torrent: TorrentType, pixeldrainAPIKey: string) {
        this.torrent = torrent;
        torrent.pixeldrainService = new PixeldrainService(pixeldrainAPIKey);
    }

    private downloadTorrent(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            this.torrent.download().then(resolve).catch(reject)
        })
    }

    private uploadDownloadedFiles(file: Uploadable): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            file.upload().then(resolve).catch(reject)
        })
    }

    /**
     * Start Download and Upload Processes
     */
    public start(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.downloadTorrent()
                .then(file => {
                    this.uploadDownloadedFiles(file)
                        .then(id => {
                            console.log(id);
                            resolve()
                        })
                })
                .catch(reject)
        })
    }
}