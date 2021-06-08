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
            console.warn("Ng Api Wrapper: Server '" + server + "' is not in the configuration, will use the defaultServer");
            server = FetchApi.defaultServer;
        }
        return server;
    };
    FetchApi.handleServerVersion = function (server, version) {
        var _a;
        if (Object.keys(FetchApi.servers[server].versions).indexOf(version) === -1) {
            console.warn("Ng Api Wrapper: Server '" + server + "' Api version '" + version + "' is not in the configuration, will use the defaultVersion");
            version = (_a = FetchApi.servers[server]) === null || _a === void 0 ? void 0 : _a.defaultVersion;
        }
        return version;
    };
    FetchApi.request = function (request) {
        var _this = this;
        request.baseUrl = FetchApi.getFullUrl(request.server, request.version);
        request.observe = request.observe || 'body';
        request.responseType = request.responseType || 'json';
        var next = function (r) {
            if (r.server !== request.server && r.version !== request.version) {
                r.baseUrl = FetchApi.getFullUrl(r.server, r.version);
            }
            return fetch(r.baseUrl + r.path, r)
                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(r.observe === "body")) return [3 /*break*/, 9];
                            _a = r.responseType;
                            switch (_a) {
                                case "text": return [3 /*break*/, 1];
                                case "json": return [3 /*break*/, 3];
                                case "blob": return [3 /*break*/, 5];
                                case "arraybuffer": return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 9];
                        case 1: return [4 /*yield*/, response.text()];
                        case 2: return [2 /*return*/, (_b.sent())];
                        case 3: return [4 /*yield*/, response.json()];
                        case 4: return [2 /*return*/, (_b.sent())];
                        case 5: return [4 /*yield*/, response.blob()];
                        case 6: return [2 /*return*/, (_b.sent())];
                        case 7: return [4 /*yield*/, response.arrayBuffer()];
                        case 8: return [2 /*return*/, (_b.sent())];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
        };
        return FetchApi.interceptors.request ? FetchApi.interceptors.request(request, next) : next(request);
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
//# sourceMappingURL=fetcht-api.js.map