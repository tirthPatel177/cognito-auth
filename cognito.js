const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

let poolData = {
  UserPoolId: "", // Your user pool id here
  ClientId: "", // Your client id here
  AliasAttributes: ["email", "phone_number"],
};

const register = async (username, phNo, password) => {
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeList = [];

  // let dataEmail = {
  //   Name: "email",
  //   Value: "",
  // };

  let dataPhoneNumber = {
    Name: "phone_number",
    Value: phNo,
  };
  // let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
  //   dataEmail
  // );
  let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataPhoneNumber
  );

  // attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);

  try {
    await userPool.signUp(
      username,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        let cognitoUser = result.user;
        console.log("user name is " + cognitoUser.getUsername());
      }
    );
  } catch (err) {
    console.log("Error registering user", err);
  }
};

const verify = async (attribute, otp, username, password) => {
  try {
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: username,
      Pool: userPool,
    };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        console.log("id token + " + result.getIdToken().getJwtToken());
        try {
          cognitoUser.confirmRegistration(otp, true, function (err, result) {
            if (err) {
              alert(err.message || JSON.stringify(err));
              return;
            }
            console.log("call result: " + result);
          });
          console.log("User verified successfully", result);
        } catch (err) {
          console.log("Error verifying user", err);
        }
      },
    });
  } catch (err) {
    console.log("Error signing in user", err);
  }
};

// SignIN user
const signIn = async (username, password) => {
  try {
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: username,
      Pool: userPool,
    };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        console.log("id token + " + result.getIdToken().getJwtToken());
      },
      onFailure: function (err) {
        console.log("Error signing in user", err);
      },
    });
  } catch (err) {
    console.log("Error signing in user", err);
  }
};

async function VerifyPhoneOTP(username, phone, otp) {
  //
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(otp, true, function (err, result) {
    if (err) {
      console.log("VERIFY ERROR: ", err);
    }
    console.log("VerifyPhoneOTP callback result: " + result);

    //
  });
}

// Verify user email
const verifyEmail = async (username, otp, password) => {
  try {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("Access token: " + result.getAccessToken().getJwtToken());
        console.log("ID token: " + result.getIdToken().getJwtToken());

        cognitoUser.verifyAttribute("email", otp, {
          onSuccess: function (result) {
            console.log("Email verified successfully", result);
          },
          onFailure: function (err) {
            console.log("Error verifying email", err);
          },
        });
      },
      onFailure: function (err) {
        console.log("Error signing in user", err);
      },
    });
  } catch (err) {
    console.log("Error verifying email", err);
  }
};

//
const resendVerificationCode = async (username, attributeName, password) => {
  try {
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: username,
      Pool: userPool,
    };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        console.log("id token + " + result.getIdToken().getJwtToken());
        try {
          // Get the user attributes
          cognitoUser.getAttributeVerificationCode(attributeName, {
            onSuccess: function (result) {
              console.log(`Verification code sent for ${attributeName}`);
            },
            onFailure: function (err) {
              console.log(
                `Error sending verification code for ${attributeName}:`,
                err
              );
            },
          });
        } catch (err) {
          console.log("Error resending verification code:", err);
        }
      },
      onFailure: function (err) {
        console.log("Error signing in user", err);
      },
    });
  } catch (err) {
    console.log("Error signing in user", err);
  }
};

// addEmailToUser
const addEmailToUser = async (username, email, password) => {
  try {
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: username,
      Pool: userPool,
    };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        console.log("id token + " + result.getIdToken().getJwtToken());
        try {
          // Add the email to the user
          const attributeList = [
            new AmazonCognitoIdentity.CognitoUserAttribute({
              Name: "email",
              Value: email,
            }),
          ];
          cognitoUser.updateAttributes(attributeList, function (err, result) {
            if (err) {
              console.log("Error adding email to user:", err);
            }
            console.log("Email added to user successfully", result);
          });
        } catch (err) {
          console.log("Error adding email to user:", err);
        }
      },
      onFailure: function (err) {
        console.log("Error signing in user", err);
      },
    });
  } catch (err) {
    console.log("Error signing in user", err);
  }
};

module.exports = {
  register,
  verify,
  resendVerificationCode,
  VerifyPhoneOTP,
  addEmailToUser,
  verifyEmail,
  signIn,
};
