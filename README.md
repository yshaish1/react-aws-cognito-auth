# YsAuth Amplify (AWS Cognito User Pool) Authentication

This library is helper to aws amplify (with Cognito user pool) authentication with react

## How To Use

---

first of all you need to create user pool on aws cognito

https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html

---

### Provider

On top of your app need to add <b>YsAuth Provider</b> as describe below

First of all you need to import provider

```javascript
import { YsAuthProvider } from 'ysauth';
```

Then impliment like this (for example)

```javascript
<YsAuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</YsAuthProvider>
```

---

### Configure Amplify

```javascript
import { YsAuthAmpliftConfig } from 'ysauth';
```

And the configuration itself

```javascript
YsAuthAmpliftConfig({
  region: '###',
  userPoolId: '###',
  userPoolWebClientId: '###',
});
```

---

# That's It! 🚀

Now you can call <b>useAuth</b> wherever you want to use.

```javascript
import { useAuth } from 'ysauth';
```

## Uses

```javascript
const auth = useAuth();

auth.loading;
auth.getCurrentUser();
auth.login('username', 'password');
auth.signup('email', 'username', 'password');
auth.confirmSignup('username', 'code');
auth.logout();
auth.resetPassword('username', 'password', 'resetCode');
```
