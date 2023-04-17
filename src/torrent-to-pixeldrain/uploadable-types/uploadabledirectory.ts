import { Uploadable } from "../interfaces/uploadable";
import { Zipper } from "../components/zipper";
import { PixeldrainService } from "../services/pixeldrainservice";
import * as superchargedFs from '@supercharge/fs'

export class UploadableDirectory implements Uploadable {

    location: string;
    name: string;
    zipper: Zipper;
    pixeldrainService: PixeldrainService;

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
                            await superchargedFs.emptyDir("./zipped");
                            await superchargedFs.remove("./zipped");
                            resolve(id);
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }
}