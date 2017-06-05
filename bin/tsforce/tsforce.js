"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var fetch = require("node-fetch");
var Force = (function () {
    function Force(token) {
        this.token = token;
    }
    /**
     * Creating a HTTP request
     * @param  {string} method HTTP verb
     * @param  {string} path   Path to ressource
     * @return {fetch.Request}
     */
    Force.prototype.newRequest = function (method, path) {
        var req = new fetch.Request('https://' + this.token.instance_url + path, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + this.token.access_token,
                'Content-Type': 'application/json'
            }
        });
        return req;
    };
    /**
     * Executing an HTTP request
     * @param  {fetch.Request} request HTTP Request to execute
     * @return {Promise<fetch.Response>}
     */
    Force.prototype["do"] = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(request)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Getting Code Coverage from the Salesforce instance
     * @return Promise<Array<ApexCodeCoverage>>
     */
    Force.prototype.getCoverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, request, response, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = encodeURIComponent('SELECT ApexTestClass.Name, ApexTestClassId, TestMethodName, NumLinesUncovered, NumLinesCovered, ApexClassorTrigger.Name, ApexClassOrTriggerId, Coverage FROM ApexCodeCoverage ORDER BY ApexClassOrTrigger.Name ASC, ApexTestClass.Name ASC, TestMethodName ASC');
                        request = this.newRequest('GET', '/services/data/v39.0/tooling/query?q=' + query);
                        return [4 /*yield*/, this["do"](request)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body.records];
                }
            });
        });
    };
    return Force;
}());
exports.Force = Force;
