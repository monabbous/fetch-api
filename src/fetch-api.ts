import {
    ArrayBufferRequest,
    BlobRequest, DefaultRequest,
    JSONRequest, ReadRequestInput,
    Request, RequestInput,
    TextRequest, WriteRequestInput
} from "./interfaces/requests.interface";

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


const flattenObject = (object) => {
    const f = (o, acc, keys) => {
        return Object.entries(o).reduce((a, [k, value]) => {
            let key = [...keys, k];
            if (typeof value === 'object') {
                f(value, a, key);
            } else {
                a[key.reduce((a, b) => `${a}[${b}]`)] = value;
            }
            return a;
        }, acc);
    }

    return f(object, {}, []);
}

export class FetchApi {

    public static servers: Servers = {};
    public static defaultServer: string = '';
    public static readonly interceptors: {
        request?(request: (Request & RequestInput), next: (request: (Request & RequestInput)) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>
        response?(response: Response, request: (Request & RequestInput), next: (response: Response) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>
    } = {};

    public static getFullUrl(server, version): string {
        server = FetchApi.handleServer(server);
        version = FetchApi.handleServerVersion(server, version);
        return FetchApi.servers[server]?.baseUrl + FetchApi.servers[server]?.versions[version];
    }


    protected static handleServer(server): string {
        if (Object.keys(FetchApi.servers).indexOf(server) === -1) {
            if (server !== undefined) {
                console.warn(`Ng Api Wrapper: Server '${server}' is not in the configuration, will use the defaultServer`);
            }
            server = FetchApi.defaultServer;
        }
        return server;
    }

    protected static handleServerVersion(server, version): string {
        if (Object.keys(FetchApi.servers[server].versions).indexOf(version) === -1) {
            if (version !== undefined) {
                console.warn(`Ng Api Wrapper: Server '${server}' Api version '${version}' is not in the configuration, will use the defaultVersion`);
            }
            version = FetchApi.servers[server]?.defaultVersion;
        }
        return version;
    }

    public static request(request: DefaultRequest & RequestInput): Promise<Response>;
    public static request<T extends string = string>(request: TextRequest & RequestInput): Promise<T>;
    public static request<T extends Blob = Blob>(request: BlobRequest & RequestInput): Promise<T>;
    public static request<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & RequestInput): Promise<T>;
    public static request<T = unknown>(request: JSONRequest & RequestInput): Promise<T>;
    public static async request<T = any>(request: Request & RequestInput) {
        if (request.outsource !== true) {
            request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
        }
        request.observe = request.observe || 'body';
        request.responseType = request.responseType || 'json';
        let hasError = false;

        const next = (r: Request & RequestInput) => {
            request = r;
            request.headers = new Headers(request.headers);
            let url: URL;
            if (request.outsource !== true) {
                if (request.server !== request.server && request.version !== request.version) {
                    request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
                }
                url = new URL(request.baseUrl + request.path);
            } else {
                url = new URL(request.path);
            }

            if (request.method === 'GET' && (request.body instanceof URLSearchParams || request.body instanceof Object)) {
                const params = new URLSearchParams(request.body instanceof URLSearchParams ? request.body : Object.entries(flattenObject(request.body)));
                delete request.body;
                params.forEach((v, k) => url.searchParams.set(k.replace(/^\?/, ''), v));
            } else {
                if (
                    !(request.body instanceof Blob ||
                        request.body instanceof FormData ||
                        request.body instanceof ArrayBuffer ||
                        request.body instanceof URLSearchParams ||
                        request.body instanceof ReadableStream ||
                        request.body instanceof String)
                    && ['application/json', '', undefined, null].includes(request.headers.get('Content-Type'))) {
                    request.headers.set('Content-Type', 'application/json');
                    // @ts-ignore
                    if (request.flatten) {
                        request.body = flattenObject(request.body);
                    }

                    request.body = JSON.stringify(request.body);
                } else if (request.body instanceof FormData) {
                    request.headers.set('Content-Type', 'multipart/form-data');
                }
            }
            return fetch(url.toString(), request as RequestInit);
        };

        const nextResponse = async (res) => {
            if (request.observe === "body" && res instanceof Response) {
                let body: any = res.body;
                switch (request.responseType) {
                    case "text":
                        body = (await res.text()) as (T | String);
                        break;
                    case "json":
                        body = (await res.json()) as (T | Object);
                        break;
                    case "blob":
                        body = (await res.blob()) as (T | Blob);
                        break;
                    case "arraybuffer":
                        body = (await res.arrayBuffer()) as (T | ArrayBuffer);
                        break;
                }

                if (hasError) {
                    throw body;
                }
                return body;
            } else if (res.observe === "response" && res instanceof Response) {
                if (hasError) {
                    return res as Response;
                } else {
                    throw res as Response;
                }
            }
            if (hasError) {
                return res;
            } else {
                throw res;
            }
        }


        try {
            const response = await (FetchApi.interceptors.request ? FetchApi.interceptors.request(request, next) : next(request));
            return await (FetchApi.interceptors.response ? FetchApi.interceptors.response(response, request, nextResponse) : nextResponse(response));
        } catch (error) {
            hasError = true;
            throw await (FetchApi.interceptors.response ? FetchApi.interceptors.response(error, request, nextResponse) : nextResponse(error));
        }
    }

    public static get(request: DefaultRequest & Omit<ReadRequestInput, 'method'>): Promise<Response>;
    public static get<T extends string = string>(request: TextRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    public static get<T extends Blob = Blob>(request: BlobRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    public static get<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    public static get<T = any>(request: JSONRequest & Omit<ReadRequestInput, 'method'>): Promise<T>;
    public static get<T = unknown>(request: Request & Omit<ReadRequestInput, 'method'>) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'GET'});
    }

    public static post(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    public static post<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static post<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static post<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static post<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static post<T = unknown>(request: Request & Omit<WriteRequestInput, 'method'>) {
        // @ts-ignore
        return FetchApi.request<T>({
            ...request,
            method: 'POST'
        });
    }

    public static put(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    public static put<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static put<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static put<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static put<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static put<T = unknown>(request: Request & Omit<WriteRequestInput, 'method'>) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'PUT'} as Request & WriteRequestInput);
    }

    public static patch(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    public static patch<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static patch<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static patch<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static patch<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static patch<T = unknown>(request: Request & Omit<WriteRequestInput, 'method'>) {
        // @ts-ignore
        return FetchApi.request<T>({
            ...request,
            method: 'PATCH'
        });
    }

    public static delete(request: DefaultRequest & Omit<WriteRequestInput, 'method'>): Promise<Response>;
    public static delete<T extends string = string>(request: TextRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static delete<T extends Blob = Blob>(request: BlobRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static delete<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static delete<T = any>(request: JSONRequest & Omit<WriteRequestInput, 'method'>): Promise<T>;
    public static delete<T = unknown>(request: Request & Omit<WriteRequestInput, 'method'>) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'DELETE'});
    }

}
