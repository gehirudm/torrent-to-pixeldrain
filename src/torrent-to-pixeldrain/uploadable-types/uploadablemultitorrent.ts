import { Uploadable } from "../interfaces/uploadable";

export class UploadableMultiTorrentDownloads implements Uploadable {
    children:Uploadable[];
    
    upload(APIKey:string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            
        })
    }

}