var FetchApiHeaders = /** @class */ (function () {
    function FetchApiHeaders(headers) {
        this.headers = {};
        this.headers = headers instanceof FetchApiHeaders ? headers.headers : headers || {};
        return new Proxy(this, {
            get: function (target, p, receiver) {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) < -1) {
                    target.get(p);
                }
            },
            set: function (target, p, value, receiver) {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) < -1) {
                    target.set(p, value);
                }
                return false;
            },
            has: function (target, p) {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) < -1) {
                    return target.has(p);
                }
                return false;
            },
            deleteProperty: function (target, p) {
                if (['headers', 'get', 'set', 'append', 'delete', 'has'].indexOf(p) < -1) {
                    target.delete(p);
                }
                return false;
            }
        });
    }
    FetchApiHeaders.prototype.set = function (key, value) {
        var _a;
        if (this.headers instanceof Headers) {
            this.headers.set(key, value);
        }
        else if (Array.isArray(this.headers)) {
            var index = this.headers.findIndex(function (h) { return Array.isArray(h) ? h[0] === key : false; });
            if (index > -1) {
                this.headers[index] = ([key].concat(value));
            }
            else {
                this.headers.push([key].concat(value));
            }
        }
        else {
            this.headers = (_a = this.headers) !== null && _a !== void 0 ? _a : {};
            this.headers[key] = value;
        }
        return this;
    };
    FetchApiHeaders.prototype.append = function (key, value) {
        var _a;
        if (this.headers instanceof Headers) {
            this.headers.append(key, value);
        }
        else if (Array.isArray(this.headers)) {
            this.headers.push([key].concat(value));
        }
        else {
            this.headers = (_a = this.headers) !== null && _a !== void 0 ? _a : {};
            this.headers[key] = value;
        }
        return this;
    };
    FetchApiHeaders.prototype.delete = function (key) {
        if (this.headers instanceof Headers) {
            this.headers.delete(key);
        }
        else if (Array.isArray(this.headers)) {
            var index = this.headers.findIndex(function (h) { return Array.isArray(h) ? h[0] === key : false; });
            if (index > -1) {
                this.headers.splice(index, 1);
            }
        }
        else if (typeof this.headers === 'object') {
            delete this.headers[key];
        }
        return this;
    };
    FetchApiHeaders.prototype.get = function (key) {
        if (this.headers instanceof Headers) {
            return this.headers.get(key);
        }
        else if (Array.isArray(this.headers)) {
            var header = this.headers.find(function (h) { return Array.isArray(h) ? h[0] === key : false; });
            if (header) {
                return header.slice(0).join(', ');
            }
        }
        else if (typeof this.headers === 'object') {
            return this.headers[key];
        }
        return undefined;
    };
    FetchApiHeaders.prototype.has = function (key) {
        if (this.headers instanceof Headers) {
            return this.headers.has(key);
        }
        else if (Array.isArray(this.headers)) {
            return !!this.headers.find(function (h) { return Array.isArray(h) ? h[0] === key : false; });
        }
        else if (typeof this.headers === 'object') {
            return !!this.headers[key];
        }
        return false;
    };
    return FetchApiHeaders;
}());
export { FetchApiHeaders };
//# sourceMappingURL=fetch-api-headers.js.map