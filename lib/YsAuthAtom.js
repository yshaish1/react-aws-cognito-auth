"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthState = exports.AuthState = void 0;
const recoil_1 = require("recoil");
const defaultState = {
    loggedIn: false,
    username: null,
    token: null,
    loading: false,
};
exports.AuthState = (0, recoil_1.atom)({
    key: 'AuthState',
    default: defaultState,
});
const useAuthState = () => (0, recoil_1.useRecoilState)(exports.AuthState);
exports.useAuthState = useAuthState;
//# sourceMappingURL=YsAuthAtom.js.map