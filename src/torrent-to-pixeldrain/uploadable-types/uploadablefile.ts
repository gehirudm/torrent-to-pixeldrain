import { Uploadable } from "../interfaces/uploadable";
import { PixeldrainService } from "../services/pixeldrainservice";

export class UploadableFile implements Uploadable {

    location: string;
    fileName: string;
    pixeldrainService: PixeldrainService;

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