import { Uploadable } from "../interfaces/uploadable";

export class UploadableMultiTorrentDownloads implements Uploadable {
    children: Uploadable[];

    upload(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let uploadQueue: Promise<string>[] = []
            this.children.forEach(child => uploadQueue.push(child.upload()))
            Promise.all(uploadQueue)
                .then(results => {
                    resolve(results.join(","))
                })
                .catch(reject)
        })
    }

}