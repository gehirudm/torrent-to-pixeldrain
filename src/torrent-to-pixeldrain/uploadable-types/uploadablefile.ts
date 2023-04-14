import { Uploadable } from "../interfaces/uploadable";

export class UploadableFile implements Uploadable {
    
    location:string;
    fileName:string;

    constructor(location:string, fileName:string) {
        this.location = location;    
        this.fileName = fileName;
    }

    upload(APIKey:string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            
        })
    }

}