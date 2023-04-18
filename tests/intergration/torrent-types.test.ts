import { FileWriter } from "../../src/torrent-to-pixeldrain/components/filewriter";
import { TorrentBuilder } from "../../src/torrent-to-pixeldrain/components/torrentbuilder";
import { TorrentToPixeldrain } from "../../src/torrent-to-pixeldrain/index";

describe("Testing torrent types", () => {
    test("Single torrent file type", () => {
        let builder = new TorrentBuilder()
            .setType("single file")
            .setInput("./tests/resources/torrent/single-torrent.torrent")
            .setOutput("./tests/downloads")

        let writer = new FileWriter("./tests/logs/test-log.txt")

        let client = new TorrentToPixeldrain(builder, "fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77", writer)

        client.start()
    })
})