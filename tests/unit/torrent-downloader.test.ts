import { TorrentDownloaderService } from "../../src/torrent-to-pixeldrain/services/torrentdownloaderservice";

import * as superchargedFs from '@supercharge/fs'

describe("Tesing torrent downloading", () => {

    test("Download a single torrent file", async () => {
        let torrentDownloaderService = new TorrentDownloaderService()
        await torrentDownloaderService.download("./tests/resources/torrent/single-torrent.torrent", "./tests/downloads")
            .then(torrent => {
                expect(torrent.sucess).toBeTruthy()
            })
    })

    afterAll(async () => {
        superchargedFs.emptyDirSync("./tests/downloads");
        await superchargedFs.removeDir("./tests/downloads");
    })
})