import { TorrentType } from "./interfaces/torrenttype";
import { Uploadable } from "./interfaces/uploadable";

class TorrentToPixeldrain {
    constructor(torrent: TorrentType, pixeldrainAPIKey: string) {

    }

    private downloadTorrent(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {
            
        })
    }

    private uploadDownloadedFiles(file: Uploadable): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            
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