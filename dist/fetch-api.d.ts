import { ArrayBufferRequest, BlobRequest, DefaultRequest, JSONRequest, ReadRequestInput, Request, RequestInput, TextRequest, WriteRequestInput } from "./interfaces/requests.interface";
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
        request?(request: (Request & RequestInput), next: (request: (Request & RequestInput)) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>;
        response?(response: Response, request: (Request & RequestInput), next: (response: Response) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>;
    };
    static getFullUrl(server: any, version: any): string;
    protected static handleServer(server: any): string;
    protected static handleServerVersion(server: any, version: any): string;
    static request(request: DefaultRequest & RequestInput): Promise<Response>;
    static request<T extends string = string>(request: TextRequest & RequestInput): Promise<T>;
    static request<T extends Blob = Blob>(request: BlobRequest & RequestInput): Promise<T>;
    static request<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & RequestInput): Promise<T>;
    static request<T = unknown>(request: JSONRequest & RequestInput): Promise<T>;
    static get(request: DefaultRequest & Omit<ReadRequestInput, 'method'>): Promise<Response>;
    static get<T extends string = string>(request: TextRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    static get<T extends Blob = Blob>(request: BlobRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    static get<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    static get<T = any>(request: JSONRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    static post(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    static post<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static post<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static post<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static post<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static put(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    static put<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static put<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static put<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static put<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static patch(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    static patch<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static patch<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static patch<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static patch<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static delete(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    static delete<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static delete<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static delete<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    static delete<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
}
export {};
