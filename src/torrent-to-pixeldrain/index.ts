import { TorrentType } from "./interfaces/torrenttype";
import { Uploadable } from "./interfaces/uploadable";

export class TorrentToPixeldrain {
    torrent: TorrentType;
    APIKey: string;

    constructor(torrent: TorrentType, pixeldrainAPIKey: string) {
        this.torrent = torrent;
        this.APIKey = pixeldrainAPIKey;
    }

    private downloadTorrent(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            this.torrent.download().then(resolve).catch(reject)
        })
    }

    private uploadDownloadedFiles(file: Uploadable): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            file.upload(this.APIKey).then(() => resolve(true)).catch(() => reject(false))
        })
    }

    /**
     * Start Download and Upload Processes
     */
    public start(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            this.downloadTorrent()
                .then(async (file) => {
                    let status = await this.uploadDownloadedFiles(file);
                    if (!status) {
                        reject("Error occured while uploading file")
                    }
                })
                .catch(e => reject(e))
        })
    }
}