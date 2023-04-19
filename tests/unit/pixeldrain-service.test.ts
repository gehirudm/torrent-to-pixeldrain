import { PixelDrain } from "pixeldrainjs";
import { FileWriter } from "../../src/torrent-to-pixeldrain/components/filewriter";
import { PixeldrainService } from "../../src/torrent-to-pixeldrain/services/pixeldrainservice"

import * as superchargedFs from '@supercharge/fs'

describe("Testing Pixeldrain service functions", () => {
    let uploadedFileID: string;
    let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

    test("Upload a file to pixeldrain (With Writer)", async () => {
        let writer = new FileWriter("./tests/logs/test-log.txt")
        let pixeldrainService = new PixeldrainService("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77", writer);
        uploadedFileID = await pixeldrainService.uploadFile("./tests/resources/zip/single-file.txt", "single-file.txt")

        // Manually call writer.write() because usually it's called by the TorrentToPixeldrain class
        writer.write();

        // Check if the file is correctly uploaded
        let file = await client.getFile(uploadedFileID);
        expect(file.name).toBe("single-file.txt")

        // Check if the logs are correctly written
        expect(superchargedFs.readFileSync("./tests/logs/test-log.txt").toString()).toBe("https://pixeldrain.com/u/" + uploadedFileID)
    })

    test("Upload a file to pixeldrain (Without Writer)", async () => {
        let pixeldrainService = new PixeldrainService("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77");
        uploadedFileID = await pixeldrainService.uploadFile("./tests/resources/zip/single-file.txt", "single-file.txt")

        // Check if the file is correctly uploaded
        let file = await client.getFile(uploadedFileID);
        expect(file.name).toBe("single-file.txt")
    })

    afterEach(async () => {
        // Delete log files if exist
        if (superchargedFs.existsSync("./tests/logs/test-log.txt")) {
            superchargedFs.emptyDirSync("./tests/logs");
            await superchargedFs.removeDir("./tests/logs");
        }

        // Delete uploaded file
        let file = await client.getFile(uploadedFileID)
        await file.delete();
    })
})