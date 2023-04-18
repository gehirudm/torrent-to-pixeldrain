import { Zipper } from "../../src/torrent-to-pixeldrain/components/zipper";
import * as superchargedFs from '@supercharge/fs'

describe("Testing Zipper functions", () => {
    test("Zip a directory", async () => {
        let zipper = new Zipper()
        await zipper.zip("./tests/resources/zip/multi-file-directory", "./tests/resources/zip/zipped/test-zip.zip");
        await expect(superchargedFs.isFile("./tests/resources/zip/zipped/test-zip.zip")).resolves.toBeTruthy();
    })

    afterAll(async () => {
        superchargedFs.emptyDirSync("./tests/resources/zip/zipped");
        await superchargedFs.removeDir("./tests/resources/zip/zipped");
    })
})