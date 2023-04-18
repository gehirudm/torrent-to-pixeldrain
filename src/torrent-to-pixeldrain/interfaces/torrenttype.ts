import { PixeldrainService } from "../services/pixeldrainservice";
import { Uploadable } from "./uploadable";

export interface Torrent {
    pixeldrainService: PixeldrainService;
    input: string;
    output?: string;
    download(downloadPath?: string): Promise<Uploadable>
}