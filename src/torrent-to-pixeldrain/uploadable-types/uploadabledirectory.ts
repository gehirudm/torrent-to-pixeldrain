import { Uploadable } from "../uploadableinterface";

class UploadableDirectory implements Uploadable {
    
    APIKey: string;

    constructor(APIKey: string) {
        this.APIKey = APIKey;
    }

    upload(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            
        })
    }

}