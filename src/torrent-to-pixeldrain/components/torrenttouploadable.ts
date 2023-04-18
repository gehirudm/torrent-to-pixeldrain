import { DownloadedTorrent } from "../interfaces/downloadedtorrent";
import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";
import { UploadableDirectory } from "../uploadable-types/uploadabledirectory";
import { UploadableFile } from "../uploadable-types/uploadablefile";

export class TorrentToUplodable {
    static convert(torrent: DownloadedTorrent, pixeldrainService: PixeldrainService): Uploadable {
        if (torrent.fileCount > 1) {
            return new UploadableDirectory(torrent.downloadedPath, torrent.name, pixeldrainService)
        } else {
            return new UploadableFile(torrent.filePath, torrent.name, pixeldrainService)
        }
    }
}