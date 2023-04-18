import { PixeldrainFile } from "pixeldrainjs/dist/pixeldrain.js/components/file/file"
import { UploadableFile } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablefile";
import { PixeldrainService } from "../../src/torrent-to-pixeldrain/services/pixeldrainservice";
import { PixelDrain } from "pixeldrainjs";
import { UploadableDirectory } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadabledirectory";
import { UploadableMultiTorrentDownloads } from "../../src/torrent-to-pixeldrain/uploadable-types/uploadablemultitorrent";

describe("Testing Uploadable types", () => {
    let uploadedFiles: PixeldrainFile[] = [];
    let pixeldrainService = new PixeldrainService("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77");
    let client = new PixelDrain("fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77")

    test("Uploadable file", async () => {
        let uploadable = new UploadableFile("./tests/resources/zip/single-file.txt", "single-file.txt", pixeldrainService)
        let id = await uploadable.upload()

        let file = await client.getFile(id);
        uploadedFiles.push(file)
        expect(file.name).toBe("single-file.txt")
    })

    test("Uploadable directory", async () => {
        let uploadable = new UploadableDirectory("./tests/resources/zip/multi-file-directory", "multi-file", pixeldrainService)
        let id = await uploadable.upload()

        let file = await client.getFile(id);
        uploadedFiles.push(file)
        expect(file.name).toBe("multi-file.zip")
    })

    test("Multiple Torrent Uploadable", async () => {
        let uploadable1 = new UploadableFile("./tests/resources/zip/single-file.txt", "single-file.txt", pixeldrainService)
        let uploadable2 = new UploadableDirectory("./tests/resources/zip/multi-file-directory", "multi-file", pixeldrainService)
        let multiUploadable = new UploadableMultiTorrentDownloads()
        multiUploadable.children = [uploadable1, uploadable2];

        let ids = (await multiUploadable.upload()).split(",")

        let file1 = await client.getFile(ids[0]);
        uploadedFiles.push(file1)
        expect(file1.name).toBe("single-file.txt")

        let file2 = await client.getFile(ids[1]);
        uploadedFiles.push(file2)
        expect(file2.name).toBe("multi-file.zip")
    })

    afterAll(async () => {
        uploadedFiles.forEach(async file => {
            await file.delete();
        })
    })
})