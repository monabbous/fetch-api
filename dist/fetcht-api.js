import { __assign, __awaiter, __generator } from "tslib";
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