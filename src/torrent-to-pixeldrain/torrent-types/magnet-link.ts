import { TorrentType } from "../interfaces/torrenttype";
import { Uploadable } from "../interfaces/uploadable";

export class MagnetLink implements TorrentType {
    magnetLink: string;

    constructor(magnetLink: string) {
        magnetLink = magnetLink;
    }

    download(): Promise<Uploadable> {
        return new Promise<Uploadable>((resolve, reject) => {

        })
    }
}