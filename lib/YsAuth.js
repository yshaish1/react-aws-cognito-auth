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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.YsAuthAmpliftConfig = void 0;
const aws_amplify_1 = __importStar(require("aws-amplify"));
const YsAuthAmpliftConfig = (props) => {
    aws_amplify_1.default.configure({
        Auth: {
            region: props.region,
            userPoolId: props.userPoolId,
            userPoolWebClientId: props.userPoolWebClientId,
            authenticationFlowType: "USER_PASSWORD_AUTH",
        },
    });
};
exports.YsAuthAmpliftConfig = YsAuthAmpliftConfig;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield aws_amplify_1.Auth.signIn(username, password));
        return {
            username: user.getUsername(),
            token: user.getSignInUserSession().getIdToken().getJwtToken(),
        };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield aws_amplify_1.Auth.signOut();
    }
    catch (error) {
        throw error;
    }
});
exports.logout = logout;
//# sourceMappingURL=YsAuth.js.map