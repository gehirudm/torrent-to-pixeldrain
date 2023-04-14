import { Uploadable } from "../interfaces/uploadable";

import * as archiver from 'archiver';
import { Archiver } from "archiver";
import { ReadStream } from "fs";
import fetch from "node-fetch";
import * as fs from 'fs';

export class UploadableDirectory implements Uploadable {

    location: string;
    name: string;

    constructor(location: string, name: string) {
        this.location = location;
        this.name = name;
    }

    upload(APIKey: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const archive = archiver('zip', { zlib: { level: 9 } });

            this.zipDirectory(this.location, this.name, archive)
                .then((zipDir) => {
                    let readStream = fs.createReadStream(zipDir);
                    this.uploadFromReadStream(readStream, APIKey, this.name)
                        .then(resolve)
                })
                .catch(reject)
            archive.finalize();
        })
    }

    zipDirectory(sourceFolder: string, zipName: string, archiver: Archiver): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            const writeStream = fs.createWriteStream(`./zipped/${zipName}`);
            archiver
                .directory(sourceFolder, false)
                .on('error', err => reject(err))
                .pipe(writeStream);

            writeStream.on('close', () => resolve(`./zipped/${zipName}`));
            archiver.finalize();
        })
    }

    uploadFromReadStream(readStream: ReadStream, APIKey: string, fileName: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            fetch(`https://pixeldrain.com/api/file/${fileName}`, {
                method: 'PUT',
                headers: {
                    "Authorization": "Basic " + Buffer.from(":" + APIKey).toString('base64'),
                },
                body: readStream // Here, stringContent or bufferContent would also work
            })
                .then(async (res) => {
                    if (res.status >= 400) {
                        let msg = await res.json()
                        reject("Error Occured While Uploading! \n" + msg)
                    }
                    return res.json()
                }).then((json: { id: string }) => {
                    resolve(json.id)
                });
        });
    }

}