"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YsAuthProvider = exports.useAuth = exports.AuthContext = void 0;
const react_1 = __importDefault(require("react"));
const aws_amplify_1 = require("aws-amplify");
const react_2 = require("react");
const YsAuth = __importStar(require("./YsAuth"));
const YsAuthAtom_1 = require("./YsAuthAtom");
exports.AuthContext = (0, react_2.createContext)(null);
function useAuth() {
    const value = (0, react_2.useContext)(exports.AuthContext);
    return value;
}
exports.useAuth = useAuth;
const YsAuthProvider = ({ children }) => {
    const [authState, setAuthState] = (0, YsAuthAtom_1.useAuthState)();
    const [error, setError] = (0, react_2.useState)(null);
    const [loading, setLoading] = (0, react_2.useState)(true);
    (0, react_2.useEffect)(() => {
        const unsub = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield aws_amplify_1.Auth.currentAuthenticatedUser();
                setAuthState({
                    username: user.getUsername(),
                    loggedIn: true,
                    token: user.getSignInUserSession().getIdToken().getJwtToken(),
                });
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
            }
        });
        unsub();
    }, [setAuthState]);
    const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const user = yield YsAuth.login(username, password);
            setAuthState(Object.assign(Object.assign({}, user), { loggedIn: true }));
            setLoading(false);
            setError(null);
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }
    });
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield YsAuth.logout();
            setAuthState({
                loggedIn: false,
                username: null,
                token: null,
            });
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }
    });
    const getCurrentUser = () => {
        return { username: authState.username, token: authState.token };
    };
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: { login, logout, getCurrentUser, error, loading, user: authState } }, children));
};
exports.YsAuthProvider = YsAuthProvider;
//# sourceMappingURL=YsAuthProvider.js.map