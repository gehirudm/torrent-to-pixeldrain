import { PixeldrainService } from "../../src/torrent-to-pixeldrain/services/pixeldrainservice";

import { TorrentFile } from "../../src/torrent-to-pixeldrain/torrent-types/torrent-file";
import { MagnetLink } from "../../src/torrent-to-pixeldrain/torrent-types/magnet-link";
import { DirectoryOfTorrentFiles } from "../../src/torrent-to-pixeldrain/torrent-types/directory-of-torrent-files";

import { UploadableDirectory } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadabledirectory";
import { UploadableFile } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablefile";
import { UploadableMultiTorrentDownloads } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablemultitorrent";

import * as superchargedFs from '@supercharge/fs'
import { MockTorrentDownloadService } from "../component-mocks/torrentdownloadservice-mock";

describe("Testing torrent types", () => {
    let mockTorrentDownloadService = new MockTorrentDownloadService(true)
    let pixeldrainService = new PixeldrainService("not required for these tests")

    test("Single torrent file type", async () => {
        let singleTorrent = new TorrentFile(mockTorrentDownloadService)
        singleTorrent.input = "./tests/resources/torrent/single-torrent.torrent"
        singleTorrent.output = "./tests/test-downloads"
        singleTorrent.pixeldrainService = pixeldrainService

        // Set the return type of the mock torrent download service
        mockTorrentDownloadService.setReturnType("singleFile");

        let uploadable = await singleTorrent.download()

        expect(uploadable).toBeInstanceOf(UploadableFile);
        let files = await superchargedFs.allFiles("./tests/test-downloads")
        expect(files.length).toBe(1);
    })

    test("Magnet link type", async () => {
        let magnetLink = new MagnetLink(mockTorrentDownloadService)
        magnetLink.input = "magnet:?xt=urn:btih:ADBA7233AA317C882EF0DE1B2B305DD538E0047E&tr=udp%3A%2F%2Ftracker.bitsearch.to%3A1337%2Fannounce&tr=udp%3A%2F%2Fwww.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&dn=%5Bbitsearch.to%5D+RarLab.WinRAR.v5.10.x64.Cracked-EAT"
        magnetLink.output = "./tests/test-downloads"
        magnetLink.name = "magnet torrent download"
        magnetLink.pixeldrainService = pixeldrainService

        // Set the return type of the mock torrent download service
        mockTorrentDownloadService.setReturnType("multiFile");

        let uploadable = await magnetLink.download()

        expect(uploadable).toBeInstanceOf(UploadableDirectory);
        await expect(superchargedFs.exists("./tests/test-downloads")).resolves.toBeTruthy()
        let files = await superchargedFs.allFiles("./tests/test-downloads")
        expect(files.length).toBe(3);
    })

    test("Directory of torrents type", async () => {
        let singleTorrent = new DirectoryOfTorrentFiles(mockTorrentDownloadService)
        singleTorrent.input = "./tests/resources/torrent/multiple-torrent-directory"
        singleTorrent.output = "./tests/test-downloads"
        singleTorrent.name = "multiple torrent download"
        singleTorrent.pixeldrainService = pixeldrainService

        // Set the return type of the mock torrent download service
        mockTorrentDownloadService.setReturnType("singleFile");

        let uploadable = await singleTorrent.download()

        expect(uploadable).toBeInstanceOf(UploadableMultiTorrentDownloads);
        await expect(superchargedFs.exists("./tests/test-downloads")).resolves.toBeTruthy()
        let files = await superchargedFs.allFiles("./tests/test-downloads")
        expect(files.length).toBe(3);
    })

    afterEach(async () => {
        // Delete log files if exist
        if (superchargedFs.existsSync("./tests/test-downloads")) {
            superchargedFs.emptyDirSync("./tests/test-downloads");
            await superchargedFs.removeDir("./tests/test-downloads");
        }
    })

    afterAll(async () => {
        mockTorrentDownloadService.torrentClient.destroy();
    })
})