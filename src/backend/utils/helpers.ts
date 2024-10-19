import { VerificationCode } from "../database/entities/verification-code";

export const getCanisterLink = () => {
  let backendCanisterUrl;
  const backendCanisterId = process.env.CANISTER_ID;
  const network = process.env.DFX_NETWORK || "local";
  if (network === "local") {
    backendCanisterUrl = `http://${backendCanisterId}.localhost:4943`;
  } else if (network === "ic") {
    backendCanisterUrl = `https://${backendCanisterId}.raw.icp0.io`;
  }

  console.log("URL from helpers.ts:", backendCanisterUrl);
  return backendCanisterUrl;
};

export const generateOTP = async (length: number) => {
  let result = "";
  const characters = "0123456789";
  let codeExist;

  do {
    result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    codeExist = await VerificationCode.findOne({
      where: {
        code: result,
      },
    });
  } while (codeExist); 

  return result;
};