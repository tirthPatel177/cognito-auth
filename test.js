const AWS = require("aws-sdk");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

AWS.config.update({ region: "YOUR_REGION" });

const poolData = {
  UserPoolId: "",
  ClientId: "",
};

const signUp = async (email, phoneNumber, password) => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: phoneNumber,
    }),
  ];

  try {
    await new Promise((resolve, reject) => {
      userPool.signUp(
        "ERCW348@FRXA",
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.user);
          }
        }
      );
    });
    console.log("User signed up successfully");
  } catch (err) {
    console.log("Error signing up user", err);
  }
};

const signIn = async (username, password) => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: password,
    }
  );
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  try {
    await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
    console.log("User signed in successfully");
  } catch (err) {
    console.log("Error signing in user", err);
  }
};

module.exports = {
  signUp,
  signIn,
};
