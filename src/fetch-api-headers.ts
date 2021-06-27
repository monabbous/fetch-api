export class FetchApiHeaders implements Omit<any, keyof FetchApiHeaders> {
    public headers: Record<string, string> | Headers | string[][] = {};
    [k: string]: any;

 
    [Symbol.iterator]() {
        if (this.headers instanceof Headers || Array.isArray(this.headers)) {
            return this.headers['[Symbol.iterator]']();
        }
        const keys = Object.keys(this.headers);
        let i = keys.length;
        return {
            next: () => {
                return {
                    done: (i < 0),
                    value: this.headers[keys[--i]]
                }
            }
        };

    }

    constructor(headers?: Record<string, string> | Headers | string[][] | FetchApiHeaders) {
        this.headers = headers instanceof FetchApiHeaders ? headers.headers : headers || {};

        return new Proxy(this, {
            get(target: FetchApiHeaders, p: string, receiver: any): any {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) === -1) {
                    return target.get(p);
                } else {
                    return target[p];
                }
            },
            set(target: FetchApiHeaders, p: string, value: any, receiver: any): boolean {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) === -1) {
                    target.set(p, value);
                }
                return true;
            },
            deleteProperty(target: FetchApiHeaders, p: string): boolean {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) === -1) {
                    target.delete(p);
                }
                return false;
            }
        });
    }

    public set(key: string, value: any) {
        if (this.headers instanceof Headers) {
            this.headers.set(key, value);
        } else if (Array.isArray(this.headers)) {
            const index = this.headers.findIndex(h => Array.isArray(h) ? h[0] === key : false)
            if (index > -1) {
                this.headers[index] = ([key].concat(value));
            } else {
                this.headers.push([key].concat(value));
            }
        } else {
            this.headers = this.headers ?? {};
            this.headers[key] = value;
        }
        return this;
    }

    public append(key: string, value: any) {
        if (this.headers instanceof Headers) {
            this.headers.append(key, value);
        } else if (Array.isArray(this.headers)) {
            this.headers.push([key].concat(value));
        } else {
            this.headers = this.headers ?? {};
            this.headers[key] = value;
        }
        return this;
    }

    public delete(key: string) {
        if (this.headers instanceof Headers) {
            this.headers.delete(key);
        } else if (Array.isArray(this.headers)) {
            const index = this.headers.findIndex(h => Array.isArray(h) ? h[0] === key : false)
            if (index > -1) {
                this.headers.splice(index, 1);
            }
        } else if (typeof this.headers === 'object') {
            delete this.headers[key];
        }
        return this;
    }

    public get(key: string) {
        if (this.headers instanceof Headers) {
            return this.headers.get(key);
        } else if (Array.isArray(this.headers)) {
            const header = this.headers.find(h => Array.isArray(h) ? h[0] === key : false);
            if (header) {
                return header.slice(0).join(', ');
            }
        } else if (typeof this.headers === 'object') {
            return this.headers[key];
        }
        return undefined;
    }

    public has(key: string) {
        if (this.headers instanceof Headers) {
            return this.headers.has(key);
        } else if (Array.isArray(this.headers)) {
            return !!this.headers.find(h => Array.isArray(h) ? h[0] === key : false)
        } else if (typeof this.headers === 'object') {
            return !!this.headers[key];
        }
        return false;
    }
}