import { Uploadable } from "../interfaces/uploadable";
import { Zipper } from "../components/zipper";
import { PixeldrainService } from "../services/pixeldrainservice";
import * as superchargedFs from '@supercharge/fs'

export class UploadableDirectory implements Uploadable {

    location: string;
    name: string;
    zipper: Zipper;
    pixeldrainService: PixeldrainService;

    /**
     * Creates an instance of UploadableDirectory.
     * @param {string} location Path to the directory as a string
     * @param {string} name Name for the resulting zip after zipping the directory (Without the .zip extension)
     * @param {PixeldrainService} pixeldrainService
     * @memberof UploadableDirectory
     */
    constructor(location: string, name: string, pixeldrainService: PixeldrainService) {
        this.location = location;
        this.name = name;
        this.zipper = new Zipper();
        this.pixeldrainService = pixeldrainService;
    }

    upload(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            this.zipper.zip(this.location, `./zipped/${this.name}.zip`)
                .then(() => {
                    this.pixeldrainService.uploadFile(`./zipped/${this.name}.zip`, this.name)
                        .then(async (id) => {
                            superchargedFs.emptyDirSync("./zipped");
                            await superchargedFs.removeDir("./zipped");
                            resolve(id);
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }
}