export interface Uploadable {
    /**
     * Uploads the file to pixeldrain and returns the ID of that file
     * @return {*} {Promise<string>} ID of the file
     * @memberof Uploadable
     */
    upload(): Promise<string>
}