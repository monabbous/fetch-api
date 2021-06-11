export type BaseRequest = RequestInit & {
    path: string;
} & ({
    baseUrl?: string;
    server?: number | string;
    version?: number | string;
    outsource?: undefined | false;
} | {
    baseUrl?: string;
    outsource: true;
}) & (
    {
        method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
        body?: Blob | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;
        flatten?: true;
    }
    | {
    method?: 'GET';
    body?: object | URLSearchParams;
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
