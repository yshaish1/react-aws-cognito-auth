import React from 'react';

import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import { createContext, useContext, useEffect, useState } from 'react';
import * as ReactCognitoAuth from './react-cognito-auth';
import { AuthProps, useAuthState, User } from './react-cognito-auth-atom';
import { RecoilRoot } from 'recoil';
import { useIdleTimer } from 'react-idle-timer';

export const AuthContext = createContext(null as any);

export type UseAuthProps = {
  login: (username: string, password: string) => Promise<User>;
  logout: () => any;
  signup: (email: string, username: string, password: string) => Promise<ISignUpResult>;
  confirmSignup: (username: string, code: string) => Promise<any>;
  resetPassword: (username: string, code: string, password: string) => any;
  getCurrentUser: () => User | null;
  error: string;
  loading: boolean;
  idle: boolean;
  user: AuthProps;
};

export const useAuth = (): UseAuthProps => {
  const value = useContext(AuthContext);

  return value;
};

const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useAuthState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idle, setIdle] = useState(false);

  useIdleTimer({
    timeout: ReactCognitoAuth.getIdleTimeConfigure(), // 1 hour
    onIdle: () => setIdle(true),
    debounce: 500,
  });

  useEffect(() => {
    const unsub = async () => {
      try {
        const user: CognitoUser = await Auth.currentAuthenticatedUser();
        setAuthState({
          username: user.getUsername(),
          loggedIn: true,
          token: user.getSignInUserSession()!.getIdToken().getJwtToken(),
          expire: user.getSignInUserSession()!.getIdToken().getExpiration(),
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    unsub();
  }, [setAuthState]);

  const signup = async (email: string, username: string, password: string) => {
    setLoading(true);
    try {
      await ReactCognitoAuth.signup(email, username, password);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const confirmSignup = async (username: string, code: string) => {
    setLoading(true);
    try {
      await ReactCognitoAuth.confirmSignup(username, code);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const user = await ReactCognitoAuth.login(username, password);
      setAuthState({ ...user, loggedIn: true });
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await ReactCognitoAuth.logout();
      setAuthState({
        loggedIn: false,
        username: null,
        token: null,
        expire: null,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const resetPassword = async (username: string, code: string, password: string) => {
    setLoading(true);
    try {
      await ReactCognitoAuth.resetPassword(username, code, password);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getCurrentUser = (): User | null => {
    if (!authState.username) return null;
    return {
      username: authState.username,
      token: authState.token,
      expire: authState.expire,
    };
  };

  const isLoading = () => {
    return loading
  }

  const isIdle = () => {
    return idle
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        confirmSignup,
        resetPassword,
        getCurrentUser,
        isLoading,
        isIdle,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ReactCognitoAuthProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <RecoilRoot>
      <AuthProvider>{children}</AuthProvider>
    </RecoilRoot>
  );
};
