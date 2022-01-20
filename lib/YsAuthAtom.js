"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthState = exports.AuthState = void 0;
var recoil_1 = require("recoil");
var defaultState = {
    loggedIn: false,
    username: null,
    token: null,
    loading: false,
};
exports.AuthState = (0, recoil_1.atom)({
    key: 'AuthState',
    default: defaultState,
});
var useAuthState = function () { return (0, recoil_1.useRecoilState)(exports.AuthState); };
exports.useAuthState = useAuthState;
