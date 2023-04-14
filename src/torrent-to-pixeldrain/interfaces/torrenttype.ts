import { Uploadable } from "./uploadable";

export interface TorrentType {
    download(): Promise<Uploadable>
}