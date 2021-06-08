import { ArrayBufferRequest, BlobRequest, JSONRequest, Request, TextRequest } from "./interfaces/requests.interface";
interface ServerVersions {
    [key: string]: string;
}
interface Server {
    baseUrl: string;
    versions: ServerVersions;
    defaultVersion: keyof ServerVersions;
}
export interface Servers {
    [key: string]: Server;
}
export declare class FetchApi {
    static servers: Servers;
    static defaultServer: string;
    static readonly interceptors: {
        request?(request: Request, next: (Request: any) => Promise<any | string | Blob | ArrayBuffer>): Promise<Request>;
    };
    static getFullUrl(server: any, version: any): string;
    protected static handleServer(server: any): string;
    protected static handleServerVersion(server: any, version: any): string;
    static request<T extends string = string>(request: TextRequest): Promise<T>;
    static request<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static request<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static request<T = any>(request: JSONRequest): Promise<T>;
    static get<T extends string = string>(request: TextRequest): Promise<T>;
    static get<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static get<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static get<T = any>(request: JSONRequest): Promise<T>;
    static post<T extends string = string>(request: TextRequest): Promise<T>;
    static post<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static post<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static post<T = any>(request: JSONRequest): Promise<T>;
    static put<T extends string = string>(request: TextRequest): Promise<T>;
    static put<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static put<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static put<T = any>(request: JSONRequest): Promise<T>;
    static patch<T extends string = string>(request: TextRequest): Promise<T>;
    static patch<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static patch<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static patch<T = any>(request: JSONRequest): Promise<T>;
    static delete<T extends string = string>(request: TextRequest): Promise<T>;
    static delete<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    static delete<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    static delete<T = any>(request: JSONRequest): Promise<T>;
}
export {};
