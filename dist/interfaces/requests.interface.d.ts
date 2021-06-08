export interface BaseRequest extends RequestInit {
    baseUrl?: string;
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    path: string;
    outsource?: boolean;
    server?: number | string;
    version?: number | string;
}
export interface JSONRequest extends BaseRequest {
    responseType?: 'json';
    observe?: 'body';
}
export interface BlobRequest extends BaseRequest {
    responseType: 'blob';
    observe?: 'body';
}
export interface TextRequest extends BaseRequest {
    responseType: 'text';
    observe?: 'body';
}
export interface ArrayBufferRequest extends BaseRequest {
    responseType: 'arraybuffer';
    observe?: 'body';
}
export declare type Request = JSONRequest | BlobRequest | TextRequest | ArrayBufferRequest;
