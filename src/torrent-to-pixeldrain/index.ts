import { FileWriter } from "./components/filewriter";
import { TorrentBuilder } from "./components/torrentbuilder";
import { Torrent } from "./interfaces/torrenttype";
import { Uploadable } from "./interfaces/uploadable";
import { PixeldrainService } from "./services/pixeldrainservice";

export class TorrentToPixeldrain {
    private torrent: Torrent;
    private writer: FileWriter;

    constructor(torrent: TorrentBuilder, pixeldrainAPIKey: string, writer?: FileWriter) {
        this.writer = writer;
        this.torrent = torrent.build(new PixeldrainService(pixeldrainAPIKey, writer));
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
                        .then(async id => {
                            console.log(id);
                            if (this.writer) {
                                await this.writer.write()
                            }
                            resolve()
                        })
                })
                .catch(reject)
        })
    }
}