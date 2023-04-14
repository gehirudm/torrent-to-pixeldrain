import { Uploadable } from "../interfaces/uploadable";

export class UploadableDirectory implements Uploadable {

    location: string;
    name: string;

    constructor(location: string, name: string) {
        this.location = location;
        this.name = name;
    }

    upload(APIKey: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {

        })
    }

}