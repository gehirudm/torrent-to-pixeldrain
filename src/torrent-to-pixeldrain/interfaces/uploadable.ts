export interface Uploadable {
    /**
     * Uploads the file to pixeldrain and returns the ID of that file
     *
     * @param {string} APIKey API Key obtained from pixeldrain.com
     * @return {*}  {Promise<string>} ID of the file
     * @memberof Uploadable
     */
    upload(APIKey:string): Promise<string>
}