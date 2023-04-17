import { PixelDrain } from "pixeldrainjs";
import { FileWriter } from "../components/filewriter";

export class PixeldrainService {
    pixeldrainClient: PixelDrain;
    writer?: FileWriter;

    constructor(APIKey: string, writer?: FileWriter) {
        this.pixeldrainClient = new PixelDrain(APIKey);
        this.writer = writer;
    }

    uploadFile(path: string, name: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.pixeldrainClient.uploadFile({
                path,
                name,
                anonymous: false
            })
                .then((file) => {
                    if (this.writer) {
                        this.writer.append(`https://pixeldrain.com/u/${file.id}`)
                    }
                    resolve(file.id)
                })
                .catch(reject)
        })
    }
}