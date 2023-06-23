// AWS Cognito SignIN & SignUp flow
// 1. Register user with phone number & temp password
// 2. Verify phone number with OTP
// 3. Add email and password to user
// 4. Sign in user with email and password
// 5. Sign out user

const {
  register,
  verify,
  resendVerificationCode,
  VerifyPhoneOTP,
  addEmailToUser,
  verifyEmail,
  signIn,
} = require("./cognito");

const PH_NO = "+91";
const PASSWORD = "12345678@Abc";
const EMAIL = "";
const OLD_PASSWORD = "12345678@AbcOLD";
const USER_NAME = "";

const main = async () => {
  const args = process.argv.slice(2);
  const step = args[0];

  switch (step) {
    case "1":
      // Step 1 - get phone number from user & register with temp password
      // -> this automatically sends SMS OTP
      await register(USER_NAME, PH_NO, OLD_PASSWORD);
      break;
    case "2":
      // Step 2 - send Phone SMS OTP:
      //   await resendVerificationCode(PH_NO, "phone_number", OLD_PASSWORD);
      await VerifyPhoneOTP(USER_NAME, PH_NO, "834580");
      break;
    case "3":
      // Step 3 - verify phone number with OTP
      //   await verify(PH_NO, "123456", PH_NO, OLD_PASSWORD);
      await addEmailToUser(PH_NO, EMAIL, OLD_PASSWORD);
      break;
    case "4":
      // Step 4 - verify Email with OTP
      await verifyEmail(PH_NO, "643504", OLD_PASSWORD);
      break;
    case "5":
      await signIn(EMAIL, OLD_PASSWORD);
      break;
    case "6":
      await signIn(EMAIL, PASSWORD);
    // resendVerificationCode
    default:
      console.log("Invalid step");
  }
};

main();
