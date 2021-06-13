parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJ2X":[function(require,module,exports) {
"use strict";function e(r){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.FetchApi=void 0;var r=function(){return(r=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)},t=function(e,r,t,n){return new(t||(t=Promise))(function(o,s){function a(e){try{u(n.next(e))}catch(r){s(r)}}function i(e){try{u(n.throw(e))}catch(r){s(r)}}function u(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t(function(e){e(r)})).then(a,i)}u((n=n.apply(e,r||[])).next())})},n=function(e,r){var t,n,o,s,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=r.call(e,a)}catch(i){s=[6,i],n=0}finally{t=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}},o=function(e,r){for(var t=0,n=r.length,o=e.length;t<n;t++,o++)e[o]=r[t];return e},s=function(r){return function r(t,n,s){return Object.entries(t).reduce(function(t,n){var a=n[0],i=n[1],u=o(o([],s),[a]);return"object"===e(i)?r(i,t,u):t[u.reduce(function(e,r){return e+"["+r+"]"})]=i,t},n)}(r,{},[])},a=function(){function e(){}return e.getFullUrl=function(r,t){var n,o;return r=e.handleServer(r),t=e.handleServerVersion(r,t),(null===(n=e.servers[r])||void 0===n?void 0:n.baseUrl)+(null===(o=e.servers[r])||void 0===o?void 0:o.versions[t])},e.handleServer=function(r){return-1===Object.keys(e.servers).indexOf(r)&&(void 0!==r&&console.warn("Ng Api Wrapper: Server '"+r+"' is not in the configuration, will use the defaultServer"),r=e.defaultServer),r},e.handleServerVersion=function(r,t){var n;return-1===Object.keys(e.servers[r].versions).indexOf(t)&&(void 0!==t&&console.warn("Ng Api Wrapper: Server '"+r+"' Api version '"+t+"' is not in the configuration, will use the defaultVersion"),t=null===(n=e.servers[r])||void 0===n?void 0:n.defaultVersion),t},e.request=function(r){return t(this,void 0,void 0,function(){var o,a,i,u,c,l=this;return n(this,function(f){switch(f.label){case 0:!0!==r.outsource&&(r.baseUrl=e.getFullUrl(r.server,r.version)),r.observe=r.observe||"body",r.responseType=r.responseType||"json",o=!1,a=function(t){var n;if((r=t).headers=new Headers(r.headers),!0!==r.outsource?(r.server!=r.server&&r.version!=r.version&&(r.baseUrl=e.getFullUrl(r.server,r.version)),n=new URL(r.baseUrl+r.path)):n=new URL(r.path),"GET"===r.method&&(r.body instanceof URLSearchParams||r.body instanceof Object)){var o=new URLSearchParams(r.body instanceof URLSearchParams?r.body:Object.entries(s(r.body)));delete r.body,o.forEach(function(e,r){return n.searchParams.set(r.replace(/^\?/,""),e)})}else r.body instanceof Blob||r.body instanceof FormData||r.body instanceof ArrayBuffer||r.body instanceof URLSearchParams||r.body instanceof ReadableStream||r.body instanceof String||!["application/json","",void 0,null].includes(r.headers.get("Content-Type"))?r.body instanceof FormData&&r.headers.set("Content-Type","multipart/form-data"):(r.headers.set("Content-Type","application/json"),r.flatten&&(r.body=s(r.body)),r.body=JSON.stringify(r.body));return fetch(n.toString(),r)},i=function(e){return t(l,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:if(!("body"===r.observe&&e instanceof Response))return[3,10];switch(t=e.body,r.responseType){case"text":return[3,1];case"json":return[3,3];case"blob":return[3,5];case"arraybuffer":return[3,7]}return[3,9];case 1:return[4,e.text()];case 2:return t=n.sent(),[3,9];case 3:return[4,e.json()];case 4:return t=n.sent(),[3,9];case 5:return[4,e.blob()];case 6:return t=n.sent(),[3,9];case 7:return[4,e.arrayBuffer()];case 8:return t=n.sent(),[3,9];case 9:if(o)throw t;return[2,t];case 10:if("response"===e.observe&&e instanceof Response){if(o)return[2,e];throw e}n.label=11;case 11:if(o)return[2,e];throw e}})})},f.label=1;case 1:return f.trys.push([1,4,,6]),[4,e.interceptors.request?e.interceptors.request(r,a):a(r)];case 2:return u=f.sent(),[4,e.interceptors.response?e.interceptors.response(u,r,i):i(u)];case 3:return[2,f.sent()];case 4:return c=f.sent(),o=!0,[4,e.interceptors.response?e.interceptors.response(c,r,i):i(c)];case 5:throw f.sent();case 6:return[2]}})})},e.get=function(t){return e.request(r(r({},t),{method:"GET"}))},e.post=function(t){return e.request(r(r({},t),{method:"POST"}))},e.put=function(t){return e.request(r(r({},t),{method:"PUT"}))},e.patch=function(t){return e.request(r(r({},t),{method:"PATCH"}))},e.delete=function(t){return e.request(r(r({},t),{method:"DELETE"}))},e.servers={},e.defaultServer="",e.interceptors={},e}();exports.FetchApi=a;
},{}],"mgft":[function(require,module,exports) {
"use strict";var e=require("./fetch-api");window.FetchApi=e.FetchApi;
},{"./fetch-api":"iJ2X"}]},{},["mgft"], null)
//# sourceMappingURL=/fetch-api.cdn.js.map