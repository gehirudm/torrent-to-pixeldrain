import { TorrentType } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";

export class TorrentFile implements TorrentType {
    fileLocation: string;

    constructor(fileLocation: string) {
        fileLocation = fileLocation;
    }

    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

        })
    }
}