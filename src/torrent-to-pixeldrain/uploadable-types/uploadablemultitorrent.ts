import { Uploadable } from "../interfaces/uploadable";

export class UploadableMultiTorrentDownloads implements Uploadable {
    children:Uploadable[];
    
    upload(APIKey:string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            
        })
    }

}