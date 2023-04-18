import { TorrentDownloaderService } from "../../src/torrent-to-pixeldrain/services/torrentdownloaderservice";

import * as superchargedFs from '@supercharge/fs'

describe("Tesing torrent downloading", () => {

    test("Download a single torrent file", async () => {
        let torrentDownloaderService = new TorrentDownloaderService()

        await torrentDownloaderService.download("./tests/resources/torrent/single-torrent.torrent", "./tests/downloads", true)
            .then(torrent => {
                console.log(torrent);
                expect(torrent.sucess).toBeTruthy()
            })
    })
})