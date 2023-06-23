// SignUp with phone number, email and password
// Sign in with phone number and password
// Sign in with email and password

const { signUp, signIn } = require("./test.js");

const EMAIL = "";
const PH_NO = "+91";

const main = async () => {
  const args = process.argv.slice(2);
  const step = args[0];
  switch (step) {
    case "1":
      await signUp(EMAIL, PH_NO, "12345678@Abc");
      break;
    case "2":
      await signIn(PH_NO, "12345678@Abc");
      break;
    default:
      console.log("Invalid step");
  }
};

main();
