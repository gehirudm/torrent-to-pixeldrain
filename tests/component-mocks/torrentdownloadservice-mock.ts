import { DownloadedTorrent } from "../../src/torrent-to-pixeldrain/interfaces/downloadedtorrent";
import { TorrentDownloaderService } from "../../src/torrent-to-pixeldrain/services/torrentdownloaderservice";

import * as superchargedFs from '@supercharge/fs'

export type MockReturnType = "singleFile" | "multiFile" | "error"

export class MockTorrentDownloadService extends TorrentDownloaderService {
    public mockReturn: MockReturnType = "singleFile"

    constructor(verbose: boolean = false) {
        super(verbose);
    }

    setReturnType(type: MockReturnType) {
        this.mockReturn = type;
    }

    public download(pathToTorrent: string, outPath: string): Promise<DownloadedTorrent> {
        return new Promise<DownloadedTorrent>((resolve, reject) => {
            switch (this.mockReturn) {
                case "singleFile":
                    resolve(this.handleSingleFile(pathToTorrent, outPath));
                    break;
                case "multiFile":
                    resolve(this.handleMultiFile(pathToTorrent, outPath));
                    break;
                case "error":
                    reject(new Error("This is a mock error"))
                    break;
                default:
                    reject()
                    break;
            }
        })
    }

    private handleSingleFile(_pathToTorrent: string, outPath: string): Promise<DownloadedTorrent> {
        return new Promise<DownloadedTorrent>(async (resolve, reject) => {
            if (outPath != "") {
                await superchargedFs.ensureDir(outPath);
            }
            await superchargedFs.writeFile(`${outPath}/mock-file.txt`, "Hi I'm a mock file.");
            
            resolve({
                sucess: true,
                fileCount: 1,
                filePath: `${outPath}/mock-file.txt`,
                downloadedPath: outPath
            })
        })
    }

    private handleMultiFile(_pathToTorrent: string, outPath: string): Promise<DownloadedTorrent> {
        return new Promise<DownloadedTorrent>(async (resolve, reject) => {
            if (outPath != "") {
                await superchargedFs.ensureDir(outPath);
            }

            // Write some random files
            await superchargedFs.writeFile(`${outPath}/mock-file-1.txt`, "Hi I'm a mock file.");
            await superchargedFs.writeFile(`${outPath}/mock-file-2.txt`, "Hi I'm a mock file.");
            await superchargedFs.writeFile(`${outPath}/mock-file-3.txt`, "Hi I'm a mock file.");

            resolve({
                sucess: true,
                fileCount: 3,
                downloadedPath: outPath
            })
        })
    }
}