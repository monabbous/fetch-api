var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var flattenObject = function (object) {
    var f = function (o, acc, keys) {
        return Object.entries(o).reduce(function (a, _a) {
            var k = _a[0], value = _a[1];
            var key = __spreadArray(__spreadArray([], keys), [k]);
            if (typeof value === 'object') {
                f(value, a, key);
            }
            else {
                a[key.reduce(function (a, b) { return a + "[" + b + "]"; })] = value;
            }
            return a;
        }, acc);
    };
    return f(object, {}, []);
};
var FetchApi = /** @class */ (function () {
    function FetchApi() {
    }
    FetchApi.getFullUrl = function (server, version) {
        var _a, _b;
        server = FetchApi.handleServer(server);
        version = FetchApi.handleServerVersion(server, version);
        return ((_a = FetchApi.servers[server]) === null || _a === void 0 ? void 0 : _a.baseUrl) + ((_b = FetchApi.servers[server]) === null || _b === void 0 ? void 0 : _b.versions[version]);
    };
    FetchApi.handleServer = function (server) {
        if (Object.keys(FetchApi.servers).indexOf(server) === -1) {
            if (server !== undefined) {
                console.warn("Ng Api Wrapper: Server '" + server + "' is not in the configuration, will use the defaultServer");
            }
            server = FetchApi.defaultServer;
        }
        return server;
    };
    FetchApi.handleServerVersion = function (server, version) {
        var _a;
        if (Object.keys(FetchApi.servers[server].versions).indexOf(version) === -1) {
            if (version !== undefined) {
                console.warn("Ng Api Wrapper: Server '" + server + "' Api version '" + version + "' is not in the configuration, will use the defaultVersion");
            }
            version = (_a = FetchApi.servers[server]) === null || _a === void 0 ? void 0 : _a.defaultVersion;
        }
        return version;
    };
    FetchApi.request = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var hasError, next, nextResponse, response, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.outsource !== true) {
                            request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
                        }
                        request.observe = request.observe || 'body';
                        request.responseType = request.responseType || 'json';
                        hasError = false;
                        next = function (r) {
                            request = r;
                            request.headers = new Headers(request.headers);
                            var url;
                            if (request.outsource !== true) {
                                if (request.server !== request.server && request.version !== request.version) {
                                    request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
                                }
                                url = new URL(request.baseUrl + request.path);
                            }
                            else {
                                url = new URL(request.path);
                            }
                            if (request.method === 'GET' && (request.body instanceof URLSearchParams || request.body instanceof Object)) {
                                var params = new URLSearchParams(request.body instanceof URLSearchParams ? request.body : Object.entries(flattenObject(request.body)));
                                delete request.body;
                                params.forEach(function (v, k) { return url.searchParams.set(k.replace(/^\?/, ''), v); });
                            }
                            else {
                                if (!(request.body instanceof Blob ||
                                    request.body instanceof FormData ||
                                    request.body instanceof ArrayBuffer ||
                                    request.body instanceof URLSearchParams ||
                                    request.body instanceof ReadableStream ||
                                    request.body instanceof String)
                                    && ['application/json', '', undefined].includes(request.headers.get('Content-Type'))) {
                                    request.headers.set('Content-Type', 'application/json');
                                    // @ts-ignore
                                    if (request.flatten) {
                                        request.body = flattenObject(request.body);
                                    }
                                    request.body = JSON.stringify(request.body);
                                }
                                else if (request.body instanceof FormData) {
                                    request.headers.set('Content-Type', 'multipart/form-data');
                                }
                            }
                            return fetch(url.toString(), request);
                        };
                        nextResponse = function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var body, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(request.observe === "body" && res instanceof Response)) return [3 /*break*/, 10];
                                        body = res.body;
                                        _a = request.responseType;
                                        switch (_a) {
                                            case "text": return [3 /*break*/, 1];
                                            case "json": return [3 /*break*/, 3];
                                            case "blob": return [3 /*break*/, 5];
                                            case "arraybuffer": return [3 /*break*/, 7];
                                        }
                                        return [3 /*break*/, 9];
                                    case 1: return [4 /*yield*/, res.text()];
                                    case 2:
                                        body = (_b.sent());
                                        return [3 /*break*/, 9];
                                    case 3: return [4 /*yield*/, res.json()];
                                    case 4:
                                        body = (_b.sent());
                                        return [3 /*break*/, 9];
                                    case 5: return [4 /*yield*/, res.blob()];
                                    case 6:
                                        body = (_b.sent());
                                        return [3 /*break*/, 9];
                                    case 7: return [4 /*yield*/, res.arrayBuffer()];
                                    case 8:
                                        body = (_b.sent());
                                        return [3 /*break*/, 9];
                                    case 9:
                                        if (hasError) {
                                            throw body;
                                        }
                                        return [2 /*return*/, body];
                                    case 10:
                                        if (res.observe === "response" && res instanceof Response) {
                                            if (hasError) {
                                                return [2 /*return*/, res];
                                            }
                                            else {
                                                throw res;
                                            }
                                        }
                                        _b.label = 11;
                                    case 11:
                                        if (hasError) {
                                            return [2 /*return*/, res];
                                        }
                                        else {
                                            throw res;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, (FetchApi.interceptors.request ? FetchApi.interceptors.request(request, next) : next(request))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, (FetchApi.interceptors.response ? FetchApi.interceptors.response(response, request, nextResponse) : nextResponse(response))];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        hasError = true;
                        return [4 /*yield*/, (FetchApi.interceptors.response ? FetchApi.interceptors.response(error_1, request, nextResponse) : nextResponse(error_1))];
                    case 5: throw _a.sent();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FetchApi.get = function (request) {
        // @ts-ignore
        return FetchApi.request(__assign(__assign({}, request), { method: 'GET' }));
    };
    FetchApi.post = function (request) {
        // @ts-ignore
        return FetchApi.request(__assign(__assign({}, request), { method: 'POST' }));
    };
    FetchApi.put = function (request) {
        // @ts-ignore
        return FetchApi.request(__assign(__assign({}, request), { method: 'PUT' }));
    };
    FetchApi.patch = function (request) {
        // @ts-ignore
        return FetchApi.request(__assign(__assign({}, request), { method: 'PATCH' }));
    };
    FetchApi.delete = function (request) {
        // @ts-ignore
        return FetchApi.request(__assign(__assign({}, request), { method: 'DELETE' }));
    };
    FetchApi.servers = {};
    FetchApi.defaultServer = '';
    FetchApi.interceptors = {};
    return FetchApi;
}());
export { FetchApi };
//# sourceMappingURL=fetch-api.js.map