import { Uploadable } from "../interfaces/uploadable";

export class UploadableFile implements Uploadable {
    
    location:string;

    constructor(location:string) {
        this.location = location;    
    }

    upload(APIKey:string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            
        })
    }

}