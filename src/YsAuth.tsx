import { CognitoUser } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
import { User } from './YsAuthAtom';

type AmplifyConfigProps = {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
};

export const YsAuthAmpliftConfig = (props: AmplifyConfigProps) => {
  Amplify.configure({
    Auth: {
      region: props.region,
      userPoolId: props.userPoolId,
      userPoolWebClientId: props.userPoolWebClientId,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    },
  });
};

export const login = async (username: string, password: string): Promise<User> => {
  try {
    const user = (await Auth.signIn(username, password)) as CognitoUser;
    return {
      username: user.getUsername(),
      token: user.getSignInUserSession()!.getIdToken().getJwtToken(),
      expire: user.getSignInUserSession()!.getIdToken().getExpiration(),
    };
  } catch (error: any) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await Auth.signOut();
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (username: string, code: string, password: string) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, password);
  } catch (error) {
    throw error;
  }
};
