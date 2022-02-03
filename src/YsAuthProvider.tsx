import React from 'react';

import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import { createContext, useContext, useEffect, useState } from 'react';
import * as YsAuth from './YsAuth';
import { AuthProps, useAuthState, User } from './YsAuthAtom';
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

const YsProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  const [authState, setAuthState] = useAuthState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idle, setIdle] = useState(false);

  useIdleTimer({
    timeout: YsAuth.getIdleTimeConfigure(), // 1 hour
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
      await YsAuth.signup(email, username, password);
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
      await YsAuth.confirmSignup(username, code);
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
      const user = await YsAuth.login(username, password);
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
      await YsAuth.logout();
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
      await YsAuth.resetPassword(username, code, password);
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

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        confirmSignup,
        resetPassword,
        getCurrentUser,
        error,
        loading,
        idle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const YsAuthProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <RecoilRoot>
      <YsProvider>{children}</YsProvider>
    </RecoilRoot>
  );
};
