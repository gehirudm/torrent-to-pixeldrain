import { afterEach } from "node:test";
import { TorrentDownloaderService } from "../../src/torrent-to-pixeldrain/services/torrentdownloaderservice";

import * as superchargedFs from '@supercharge/fs'

describe("Tesing torrent downloading", () => {

    afterEach(() => {
        superchargedFs.emptyDirSync("./tests/downloads")
    })
    
    test("Download a single torrent file", async () => {
        let torrentDownloaderService = new TorrentDownloaderService()

        torrentDownloaderService.download("./tests/resources/torrent/single-torrent.torrent", "./tests/downloads")
    })
})