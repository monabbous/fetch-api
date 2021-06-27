export declare class FetchApiHeaders implements Omit<any, keyof FetchApiHeaders> {
    headers: Record<string, string> | Headers | string[][];
    [k: string]: any;
    [Symbol.iterator](): any;
    constructor(headers?: Record<string, string> | Headers | string[][] | FetchApiHeaders);
    set(key: string, value: any): this;
    append(key: string, value: any): this;
    delete(key: string): this;
    get(key: string): string;
    has(key: string): boolean;
}
