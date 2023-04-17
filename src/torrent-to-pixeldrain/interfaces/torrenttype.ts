import { PixeldrainService } from "../services/pixeldrainservice";
import { Uploadable } from "./uploadable";

export interface TorrentType {
    pixeldrainService: PixeldrainService;
    download(downloadPath?: string): Promise<Uploadable>
}