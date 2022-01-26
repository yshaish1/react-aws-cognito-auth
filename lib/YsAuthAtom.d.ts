export interface AuthProps extends User {
    loggedIn: boolean;
    loading?: boolean;
}
export declare type User = {
    username: string | null;
    token: string | null;
    expire: number | null;
};
export declare const AuthState: import("recoil").RecoilState<AuthProps>;
export declare const useAuthState: () => [AuthProps, import("recoil").SetterOrUpdater<AuthProps>];
