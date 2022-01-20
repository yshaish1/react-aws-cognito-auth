# ysauth v1.0.7

This library is helper to aws amplify authantiaction with react

## How To Use

---

### Provider

On top of your app need to add <b>YsAuth Provider</b> as describe below

First of all you need to import provider

```
import { YsAuthProvider } from "ysauth"
```

Then impliment like this (for example)

```
<YsAuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</YsAuthProvider>
```

---

### Configure Amplify

```
import { YsAuthAmpliftConfig } from "ysauth"
```

And the configuration itself

```
YsAuthAmpliftConfig({
  region: process.env.REACT_APP_COGNITO_REGION!,
  userPoolId: process.env.REACT_APP_COGNITO_POOL_ID!,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
})
```

---

# That's It! 🚀

Now you can call <b>usAuth</b> wherever you want to use.

```
import { useAuth } from "ysauth"
```

## Uses

```
const auth = useAuth()

auth.loading       --> until get user is logged in or not
auth.user.loggedIn --> to check if user is logged in
auth.user          --> user details
auth.login()       --> login function (await auth.login(username, password))
auth.logout()      --> logout function
```
