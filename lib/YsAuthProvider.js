"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YsAuthProvider = exports.useAuth = exports.AuthContext = void 0;
var react_1 = __importDefault(require("react"));
var aws_amplify_1 = require("aws-amplify");
var react_2 = require("react");
var YsAuth = __importStar(require("./YsAuth"));
var YsAuthAtom_1 = require("./YsAuthAtom");
var recoil_1 = require("recoil");
exports.AuthContext = (0, react_2.createContext)(null);
function useAuth() {
    var value = (0, react_2.useContext)(exports.AuthContext);
    return value;
}
exports.useAuth = useAuth;
var YsProvider = function (_a) {
    var children = _a.children;
    var _b = (0, YsAuthAtom_1.useAuthState)(), authState = _b[0], setAuthState = _b[1];
    var _c = (0, react_2.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_2.useState)(true), loading = _d[0], setLoading = _d[1];
    (0, react_2.useEffect)(function () {
        var unsub = function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, aws_amplify_1.Auth.currentAuthenticatedUser()];
                    case 1:
                        user = _a.sent();
                        setAuthState({
                            username: user.getUsername(),
                            loggedIn: true,
                            token: user.getSignInUserSession().getIdToken().getJwtToken(),
                            expire: user.getSignInUserSession().getIdToken().getExpiration(),
                        });
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        unsub();
    }, [setAuthState]);
    var signup = function (email, username, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, YsAuth.signup(email, username, password)];
                case 2:
                    user = _a.sent();
                    setLoading(false);
                    setError(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    setLoading(false);
                    setError(error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var confirmSignup = function (username, code) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, YsAuth.confirmSignup(username, code)];
                case 2:
                    user = _a.sent();
                    setLoading(false);
                    setError(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    setLoading(false);
                    setError(error_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var login = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, YsAuth.login(username, password)];
                case 2:
                    user = _a.sent();
                    setAuthState(__assign(__assign({}, user), { loggedIn: true }));
                    setLoading(false);
                    setError(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    setLoading(false);
                    setError(error_4.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, YsAuth.logout()];
                case 2:
                    _a.sent();
                    setAuthState({
                        loggedIn: false,
                        username: null,
                        token: null,
                        expire: null,
                    });
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    setLoading(false);
                    setError(error_5.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var resetPassword = function (username, code, password) { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, YsAuth.resetPassword(username, code, password)];
                case 2:
                    _a.sent();
                    setLoading(false);
                    setError(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    setLoading(false);
                    setError(error_6.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getCurrentUser = function () {
        if (!authState.username)
            return null;
        return {
            username: authState.username,
            token: authState.token,
            expire: authState.expire,
        };
    };
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: {
            login: login,
            logout: logout,
            signup: signup,
            confirmSignup: confirmSignup,
            resetPassword: resetPassword,
            getCurrentUser: getCurrentUser,
            error: error,
            loading: loading,
        } }, children));
};
var YsAuthProvider = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(recoil_1.RecoilRoot, null,
        react_1.default.createElement(YsProvider, null, children)));
};
exports.YsAuthProvider = YsAuthProvider;
