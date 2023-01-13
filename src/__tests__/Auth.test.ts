import { ReactCognitoAuthConfig } from "../react-cognito-auth"
test('Test', () => {
  ReactCognitoAuthConfig({
    region: "",
    userPoolId: "",
    userPoolWebClientId: "",
    idleTime: 10000
  })
  expect('Test').toBe('Test');
});
