import React from 'react';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthProps, User } from './YsAuthAtom';
export declare const AuthContext: React.Context<any>;
export declare type UseAuthProps = {
    login: (username: string, password: string) => Promise<User>;
    logout: () => any;
    signup: (email: string, username: string, password: string) => Promise<ISignUpResult>;
    confirmSignup: (username: string, code: string) => Promise<any>;
    resetPassword: (username: string, code: string, password: string) => any;
    getCurrentUser: () => User | null;
    error: string;
    loading: boolean;
    user: AuthProps;
};
export declare function useAuth(): UseAuthProps;
export declare const YsAuthProvider: ({ children }: JSX.ElementChildrenAttribute) => JSX.Element;
