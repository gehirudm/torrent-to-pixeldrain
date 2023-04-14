export interface Uploadable {
    upload(APIKey:string): Promise<boolean>
}