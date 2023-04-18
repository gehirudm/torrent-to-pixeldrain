import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";

export class UploadableFile implements Uploadable {

    location: string;
    fileName: string;
    pixeldrainService: PixeldrainService;

    /**
     * Creates an instance of UploadableFile.
     * @param {string} location Path to the file as a string
     * @param {string} fileName Name of the file
     * @param {PixeldrainService} pixeldrainService
     * @memberof UploadableFile
     */
    constructor(location: string, fileName: string, pixeldrainService: PixeldrainService) {
        this.location = location;
        this.fileName = fileName;
        this.pixeldrainService = pixeldrainService
    }

    upload(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            this.pixeldrainService.uploadFile(this.location, this.fileName)
                .then(resolve)
                .catch(reject)
        })
    }

}