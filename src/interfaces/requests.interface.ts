import {FetchApiHeaders} from "../fetch-api-headers";

export type ReadRequestInput = {
    method?: 'GET';
    body?: object | URLSearchParams;
    flatten?: true;
}


export type WriteRequestInput = {
    method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
} & ({
    body?: Blob | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;
    flatten?: false;
} | {
    body?: object;
    flatten?: boolean;
});

export type RequestInput = ReadRequestInput | WriteRequestInput;


export type BaseRequest = Omit<RequestInit, 'method' | 'body' | 'headers'> & {
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

export type DefaultRequest = BaseRequest & {
    responseType?: undefined;
    observe?: 'response';
}

export type JSONRequest = BaseRequest & {
    responseType?: 'json';
    observe?: 'body';
}

export type BlobRequest = BaseRequest & {
    responseType: 'blob';
    observe?: 'body';
}

export type TextRequest = BaseRequest & {
    responseType: 'text';
    observe?: 'body';
}

export type ArrayBufferRequest = BaseRequest & {
    responseType: 'arraybuffer';
    observe?: 'body';
}

export type Request =
    | DefaultRequest
    | JSONRequest
    | BlobRequest
    | TextRequest
    | ArrayBufferRequest;
