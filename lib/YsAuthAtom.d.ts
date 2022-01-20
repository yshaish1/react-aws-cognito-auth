export interface AuthProps extends User {
    loggedIn: boolean;
    loading?: boolean;
}
export declare type User = {
    username: string | null;
    token: string | null;
};
export declare const AuthState: any;
export declare const useAuthState: () => any;
