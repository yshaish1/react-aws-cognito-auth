import React from 'react';
import { AuthProps, User } from './YsAuthAtom';
export declare const AuthContext: React.Context<any>;
export declare type UseAuthProps = {
    login: (username: string, password: string) => any;
    logout: () => any;
    resetPassword: (username: string, code: string, password: string) => any;
    getCurrentUser: () => User;
    error: string;
    loading: boolean;
    user: AuthProps;
};
export declare function useAuth(): UseAuthProps;
export declare const YsAuthProvider: ({ children }: JSX.ElementChildrenAttribute) => JSX.Element;
