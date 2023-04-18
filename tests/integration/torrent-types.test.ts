import { PixeldrainService } from "../../src/torrent-to-pixeldrain/services/pixeldrainservice";
import { TorrentDownloaderService } from "../../src/torrent-to-pixeldrain/services/torrentdownloaderservice";
import { TorrentFile } from "../../src/torrent-to-pixeldrain/torrent-types/torrent-file";
import { MagnetLink } from "../../src/torrent-to-pixeldrain/torrent-types/magnet-link";
import { DirectoryOfTorrentFiles } from "../../src/torrent-to-pixeldrain/torrent-types/directory-of-torrent-files";

import { UploadableDirectory } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadabledirectory";
import { UploadableFile } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablefile";
import { UploadableMultiTorrentDownloads } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablemultitorrent";

describe("Testing torrent types", () => {
    let torrentDownloadService = new TorrentDownloaderService(true)
    let pixeldrainService = new PixeldrainService("not required for these tests")
    
    test.only("Single torrent file type", async () => {
        let singleTorrent = new TorrentFile(torrentDownloadService)
        singleTorrent.input = "./tests/resources/torrent/single-torrent.torrent"
        singleTorrent.output = "tests/downloads"
        singleTorrent.pixeldrainService = pixeldrainService
        
        let uploadable = await singleTorrent.download()
        
        expect(uploadable).toBeInstanceOf(UploadableFile);
    })

    test("Magnet link type", async () => {
        let singleTorrent = new MagnetLink(torrentDownloadService)
        singleTorrent.input = "magnet:?xt=urn:btih:ADBA7233AA317C882EF0DE1B2B305DD538E0047E&tr=udp%3A%2F%2Ftracker.bitsearch.to%3A1337%2Fannounce&tr=udp%3A%2F%2Fwww.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&dn=%5Bbitsearch.to%5D+RarLab.WinRAR.v5.10.x64.Cracked-EAT"
        singleTorrent.output = "./tests/downloads"
        singleTorrent.name = "magnet torrent download"
        singleTorrent.pixeldrainService = pixeldrainService
        
        let uploadable = await singleTorrent.download()
        
        expect(uploadable).toBeInstanceOf(UploadableDirectory);
    })

    test("Directory of torrents type", async () => {
        let singleTorrent = new DirectoryOfTorrentFiles(torrentDownloadService)
        singleTorrent.input = "./tests/resources/torrent/multiple-torrent-directory"
        singleTorrent.output = "./tests/downloads"
        singleTorrent.name = "multiple torrent download"
        singleTorrent.pixeldrainService = pixeldrainService
        
        let uploadable = await singleTorrent.download()
        
        expect(uploadable).toBeInstanceOf(UploadableMultiTorrentDownloads);
    })
})