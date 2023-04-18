import { FileWriter } from "../../src/torrent-to-pixeldrain/components/filewriter";

import * as superchargedFs from '@supercharge/fs'

describe("Testing FileWriter functions", () => {
    test("Write lines to a file", async () => {
        let writer = new FileWriter("./tests/logs/test-log.txt")
        writer.append("test line 1")
        writer.append("test line 2")
        await writer.write()
        expect(superchargedFs.readFileSync("./tests/logs/test-log.txt").toString()).toBe("test line 1\ntest line 2")
    })

    afterAll(async () => {
        superchargedFs.emptyDirSync("./tests/logs");
        await superchargedFs.removeDir("./tests/logs");
    })
})