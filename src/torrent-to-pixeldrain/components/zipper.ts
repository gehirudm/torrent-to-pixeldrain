import { Archiver } from "archiver";
import archiver from 'archiver';
import * as fs from "fs";
import * as superchargedFs from '@supercharge/fs'

export class Zipper {
    archiver: Archiver;

    constructor() {
        this.archiver = archiver('zip', { zlib: { level: 9 } });
    }

    zip(inPath: string, outPath: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (outPath != "") {
                await superchargedFs.ensureDir(superchargedFs.dirname(outPath))
            }

            const writeStream = fs.createWriteStream(outPath);

            this.archiver
                .directory(inPath, false)
                .on('error', reject)
                .pipe(writeStream);

            writeStream.on('close', resolve);
            writeStream.on('error', reject)
            this.archiver.finalize();
        })
    }
}