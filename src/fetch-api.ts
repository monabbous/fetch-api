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
        request?(request: Request, next: (request: Request) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>
        response?(response: Response, request: Request, next: (response: Response) => Promise<any | string | Blob | ArrayBuffer>): Promise<Response | any>
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
    public static async request<T = any>(request: Request) {
        request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
        request.observe = request.observe || 'body';
        request.responseType = request.responseType || 'json';

        const next = (r: Request) => {
            request = r;
            if (request.server !== request.server && request.version !== request.version) {
                request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
            }
            return fetch(request.baseUrl + request.path, request);
        };

        const nextResponse = async (res) => {
            if (request.observe === "body" && res instanceof Response) {
                switch (request.responseType) {
                    case "text":
                        return (await res.text());
                    case "json":
                        return (await res.json()) as T;
                    case "blob":
                        return (await res.blob());
                    case "arraybuffer":
                        return (await res.arrayBuffer());
                }
            }
            return res;
        }


        try {
            const response = await (FetchApi.interceptors.request ? FetchApi.interceptors.request(request, next) : next(request));
            return await (FetchApi.interceptors.response ? FetchApi.interceptors.response(response, request, nextResponse) : nextResponse(response));
        } catch (error) {
            throw await (FetchApi.interceptors.response ? FetchApi.interceptors.response(error, request, nextResponse) : nextResponse(error));
        }
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
