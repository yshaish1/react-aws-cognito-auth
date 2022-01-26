import { User } from './YsAuthAtom';
declare type AmplifyConfigProps = {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
};
export declare const YsAuthAmpliftConfig: (props: AmplifyConfigProps) => void;
export declare const login: (username: string, password: string) => Promise<User>;
export declare const logout: () => Promise<void>;
export declare const resetPassword: (username: string, code: string, password: string) => Promise<void>;
export {};
