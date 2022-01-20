import { AuthProps, User } from './YsAuthAtom';
export declare const AuthContext: any;
export declare type UseAuthProps = {
    login: (username: string, password: string) => any;
    logout: () => any;
    getCurrentUser: () => User;
    error: string;
    loading: boolean;
    user: AuthProps;
};
export declare function useAuth(): UseAuthProps;
export declare const YsAuthProvider: ({ children }: any) => any;
