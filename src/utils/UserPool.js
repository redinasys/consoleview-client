import {
    CognitoUserPool,
  } from "amazon-cognito-identity-js";
  
  const poolData = {
    UserPoolId: "us-east-1_g1WwF6jJ8",
    ClientId: "2mhrmdhqt6rjrgn3p3274tcmhh",
  };
  
  export default new CognitoUserPool(poolData);
  