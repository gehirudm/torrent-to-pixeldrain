import { Torrent } from "../interfaces/torrenttype";
import { PixeldrainService } from "../services/pixeldrainservice";
import { TorrentDownloaderService } from "../services/torrentdownloaderservice";
import { DirectoryOfTorrentFiles } from "../torrent-types/directory-of-torrent-files";
import { MagnetLink } from "../torrent-types/magnet-link";
import { TorrentFile } from "../torrent-types/torrent-file";

export type TorrentType = "magnet" | "single file" | "file directory";

export class TorrentBuilder {
    private torrent: Torrent;
    private torrentDownloadService: TorrentDownloaderService;

    constructor() {
        this.torrentDownloadService = new TorrentDownloaderService();
    }

    /**
     * Set the type of the torrent.
     *
     * @param {TorrentType} type
     * @return {*}  {TorrentBuilder}
     * @memberof TorrentBuilder
     */
    setType(type: TorrentType): TorrentBuilder {
        switch (type) {
            case "magnet":
                this.torrent = new MagnetLink(this.torrentDownloadService);
                break;
            case "file directory":
                this.torrent = new DirectoryOfTorrentFiles(this.torrentDownloadService);
                break;
            case "single file":
                this.torrent = new TorrentFile(this.torrentDownloadService)
            default:
                break;
        }
        return this;
    }

    /**
     * Set the Input of the torrent. Input can be a magnet link, path to a single torrent file or a directory of torrent files
     *
     * @param {string} input A file path of a Magnet link
     * @return {*}  {TorrentBuilder}
     * @memberof TorrentBuilder
     */
    setInput(input: string): TorrentBuilder {
        this.torrent.input = input;
        return this;
    }

    /**
     * Optional. Set the Output of the torrent. A filepath where files of the torrent should be downloaded.
     * Output defaults to "downloads" folder in source directory
     *
     * @param {string} output A file path
     * @return {*}  {TorrentBuilder}
     * @memberof TorrentBuilder
     */
    setOutput(output: string): TorrentBuilder {
        this.torrent.output = output
        return this;
    }

    setName(name: string): TorrentBuilder {
        this.torrent.name = name
        return this;
    }

    /**
     * Called inside TorrentToPixeldrain class.
     *
     * @param {PixeldrainService} pixeldrainService
     * @return {*}  {Torrent}
     * @memberof TorrentBuilder
     */
    build(pixeldrainService: PixeldrainService): Torrent {
        this.torrent.pixeldrainService = pixeldrainService
        return this.torrent;
    }
}