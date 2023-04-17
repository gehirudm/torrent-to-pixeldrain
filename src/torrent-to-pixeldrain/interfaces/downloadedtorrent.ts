export interface DownloadedTorrent {
    name?: string,
    id?: string,
    fileCount?: number,
    downloadedPath?: string,
    filePath?: string,
    sucess: boolean,
    error?: any
}