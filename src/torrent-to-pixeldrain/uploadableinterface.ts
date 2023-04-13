export interface Uploadable {
    APIKey: string,
    upload(): Promise<boolean>
}