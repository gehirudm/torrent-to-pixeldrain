import * as superchargedFs from '@supercharge/fs'

export class FileWriter {
    lines: string[];
    outPath: string;

    constructor(outPath: string) {
        this.outPath = outPath;
    }

    append(line: string) {
        this.lines.push(line);
    }

    write(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await superchargedFs.ensureDir(superchargedFs.dirname(this.outPath))
            await superchargedFs.ensureFile(this.outPath)
            superchargedFs.writeFile(this.outPath, this.lines.join("\n"))
                .then(() => resolve())
                .catch(reject)
        })
    }
}