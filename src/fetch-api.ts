import {ArrayBufferRequest, BlobRequest, JSONRequest, Request, TextRequest} from "./interfaces/requests.interface";

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

export class FetchApi {

    public static servers: Servers = {};
    public static defaultServer: string = '';
    public static readonly interceptors: {
        request?(request: Request, next: (Request) => Promise<any | string | Blob | ArrayBuffer>): Promise<Request>
    } = {};

    public static getFullUrl(server, version): string {
        server = FetchApi.handleServer(server);
        version = FetchApi.handleServerVersion(server, version);
        return FetchApi.servers[server]?.baseUrl + FetchApi.servers[server]?.versions[version];
    }


    protected static handleServer(server): string {
        if (Object.keys(FetchApi.servers).indexOf(server) === -1) {
            console.warn(`Ng Api Wrapper: Server '${server}' is not in the configuration, will use the defaultServer`);
            server = FetchApi.defaultServer;
        }
        return server;
    }

    protected static handleServerVersion(server, version): string {
        if (Object.keys(FetchApi.servers[server].versions).indexOf(version) === -1) {
            console.warn(`Ng Api Wrapper: Server '${server}' Api version '${version}' is not in the configuration, will use the defaultVersion`);
            version = FetchApi.servers[server]?.defaultVersion;
        }
        return version;
    }

    public static request<T extends string = string>(request: TextRequest): Promise<T>;
    public static request<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static request<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static request<T = any>(request: JSONRequest): Promise<T>;
    public static request<T = any>(request: Request) {
        request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
        request.observe = request.observe || 'body';
        request.responseType = request.responseType || 'json';

        const next = (r: Request) => {
            if (r.server !== request.server && r.version !== request.version) {
                r.baseUrl = FetchApi.getFullUrl(r.server, r.version);
            }
            return fetch(r.baseUrl + r.path, r)
                .then(async response => {
                    if (r.observe === "body") {
                        switch (r.responseType) {
                            case "text":
                                return (await response.text());
                            case "json":
                                return (await response.json()) as T;
                            case "blob":
                                return (await response.blob());
                            case "arraybuffer":
                                return (await response.arrayBuffer());
                        }
                    }
                });
        };
        return FetchApi.interceptors.request ? FetchApi.interceptors.request(request, next) : next(request);
    }

    public static get<T extends string = string>(request: TextRequest): Promise<T>;
    public static get<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static get<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static get<T = any>(request: JSONRequest): Promise<T>;
    public static get<T = any>(request: Request) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'GET'} as Request);
    }

    public static post<T extends string = string>(request: TextRequest): Promise<T>;
    public static post<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static post<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static post<T = any>(request: JSONRequest): Promise<T>;
    public static post<T = any>(request: Request) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'POST'} as Request);
    }

    public static put<T extends string = string>(request: TextRequest): Promise<T>;
    public static put<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static put<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static put<T = any>(request: JSONRequest): Promise<T>;
    public static put<T = any>(request: Request) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'PUT'} as Request);
    }

    public static patch<T extends string = string>(request: TextRequest): Promise<T>;
    public static patch<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static patch<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static patch<T = any>(request: JSONRequest): Promise<T>;
    public static patch<T = any>(request: Request) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'PATCH'} as Request);
    }

    public static delete<T extends string = string>(request: TextRequest): Promise<T>;
    public static delete<T extends Blob = Blob>(request: BlobRequest): Promise<T>;
    public static delete<T extends ArrayBuffer = ArrayBuffer>(request: ArrayBufferRequest): Promise<T>;
    public static delete<T = any>(request: JSONRequest): Promise<T>;
    public static delete<T = any>(request: Request) {
        // @ts-ignore
        return FetchApi.request<T>({...request, method: 'DELETE'} as Request);
    }

}
