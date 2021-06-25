import { FetchApiHeaders } from "../fetch-api-headers";
export declare type ReadRequestInput = {
    method?: 'GET';
    body?: object | URLSearchParams;
    flatten?: true;
};
export declare type WriteRequestInput = {
    method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
} & ({
    body?: Blob | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;
    flatten?: false;
} | {
    body?: object;
    flatten?: boolean;
});
export declare type RequestInput = ReadRequestInput | WriteRequestInput;
export declare type BaseRequest = Omit<RequestInit, 'method' | 'body' | 'headers'> & {
    path: string;
    headers?: HeadersInit | FetchApiHeaders;
} & ({
    baseUrl?: string;
    server?: number | string;
    version?: number | string;
    outsource?: undefined | false;
} | {
    baseUrl?: string;
    outsource: true;
});
export declare type DefaultRequest = BaseRequest & {
    responseType?: undefined;
    observe?: 'response';
};
export declare type JSONRequest = BaseRequest & {
    responseType?: 'json';
    observe?: 'body';
};
export declare type BlobRequest = BaseRequest & {
    responseType: 'blob';
    observe?: 'body';
};
export declare type TextRequest = BaseRequest & {
    responseType: 'text';
    observe?: 'body';
};
export declare type ArrayBufferRequest = BaseRequest & {
    responseType: 'arraybuffer';
    observe?: 'body';
};
export declare type Request = DefaultRequest | JSONRequest | BlobRequest | TextRequest | ArrayBufferRequest;
