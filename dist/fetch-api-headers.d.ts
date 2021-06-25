declare type FetchApiHeadersInterface = {
    [key: string]: any;
};
export declare class FetchApiHeaders implements FetchApiHeadersInterface {
    headers: Record<string, string> | Headers | string[][];
    constructor(headers?: Record<string, string> | Headers | string[][] | FetchApiHeaders);
    set(key: string, value: any): this;
    append(key: string, value: any): this;
    delete(key: string): this;
    get(key: string): string;
    has(key: string): boolean;
}
export {};
