import * as bcryptjs from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import { generateOTP } from "Helpers/helpers";
import { signToken, verifyToken } from "Helpers/jwt";
import { EmailMessage, sendEmail } from "Helpers/mailer";
import { registerSchema } from "Helpers/zod-schemas";
import { IsNull } from "typeorm";
import { User } from "../../../database/entities/user";
import { VerificationCode } from "../../../database/entities/verification-code";
import {
    httpResponseError,
    httpResponseSuccess,
} from "../../../utils/response";

export default class AuthController {
  static async getTokenAndOtp() {
    const otp = await generateOTP(6);
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcryptjs.hash(token, 5);
    const hashedOtp = await bcryptjs.hash(otp, 5);

    return { otp, token, hashedToken, hashedOtp };
  }

  static async register(request: Request, response: Response) {
    try {
      const { data, success } = registerSchema.safeParse(request.body);

      if (!success) {
        return httpResponseError(response, null, "Bad request", 400);
      }

      const isEmailExist = await User.findOneBy({
        email: data?.email,
      });

      if (isEmailExist) {
        return httpResponseError(
          response,
          null,
          "This email is already associated with another account",
          400
        );
      }

      const { otp, token, hashedToken, hashedOtp } =
        await AuthController.getTokenAndOtp();

      const user = new User();
      user.name = data?.name;
      user.email = data?.email;
      user.setRole(data?.role);

      await User.save(user);

      await VerificationCode.insert({
        code: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        user: user,
        token: hashedToken,
      });

      const emailMessage: EmailMessage = {
        body: {
          name: user.name,
          intro: [
            "Welcome to ConnectED",
            `Here is your One-Time Password (OTP) for account verification: `,
            `<h1 style="color: blue">${otp}<h1/>`,
          ],
          outro: [
            "Need help, or have questions? Just reply to this email, we'd love to help.",
          ],
        },
      };

      await sendEmail(
        emailMessage,
        user.email,
        "[ConnectED] Email Verification"
      );

      httpResponseSuccess(
        response,
        { user, token },
        "Please verify your email"
      );
    } catch (error: any) {
      console.log("ln76", error);
      httpResponseError(response, null, "Internal server error!", 500);
    }
  }

  // NOTE: In case we use otp instead of magic link, feel free to modify.
  static async verify(request: Request, response: Response) {
    try {
      const token = request.query.t;

      if (!token) {
        return response.status(400).json({
          status: 0,
          message: "Bad request!",
        });
      }

      const t = await verifyToken(token as string);

      if (!t?.decoded) {
        return response.status(400).json({
          status: 0,
          message: "Invalid token!",
        });
      }

      const user = await User.findOneBy({
        id: t.decoded.id,
        archivedAt: IsNull(),
      });

      if (!user) {
        return response.status(404).json({
          status: 0,
          message: "Invalid payload!",
        });
      }

      if (user.emailVerifiedAt) {
        return response.status(400).json({
          status: 0,
          message: "Your account was already verified!",
        });
      }

      // additional security - compare emails

      user.emailVerifiedAt = new Date();
      await User.save(user);

      return response.status(200).json({
        status: 1,
        message: "You have been verified!",
      });
    } catch {
      response.status(500).json({
        status: 0,
        message: "Server error!",
      });
    }
  }

  static async verifyFromRegister(request: Request, response: Response) {
    try {
      const { token, otp, email } = request.body;

      if (!token || !otp || !email) {
        return httpResponseError(
          response,
          null,
          "Missing required fields",
          400
        );
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      if (user.emailVerifiedAt) {
        return httpResponseError(response, null, "Email already verified", 400);
      }

      const verificationCode = await VerificationCode.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (!verificationCode) {
        return httpResponseError(
          response,
          null,
          "Verification code not found",
          404
        );
      }

      const isOtpExpired =
        new Date(verificationCode?.expiresAt as Date) < new Date();

      if (isOtpExpired) {
        return httpResponseError(
          response,
          null,
          "Verification code expired",
          400
        );
      }

      const isOtpEqual = await bcryptjs.compare(
        otp,
        verificationCode?.code as string
      );

      if (!isOtpEqual) {
        return httpResponseError(
          response,
          null,
          "Invalid verification code",
          400
        );
      }

      const isTokenEqual = await bcryptjs.compare(
        token,
        verificationCode?.token as string
      );

      if (!isTokenEqual) {
        return httpResponseError(response, null, "Invalid token", 400);
      }

      user.emailVerifiedAt = new Date();
      await VerificationCode.delete(verificationCode.id);
      await User.save(user);

      const jsonData = await signToken({ id: user.id }, "7d");

      if (!jsonData.data) {
        return httpResponseError(
          response,
          null,
          "Internal server error. Failed to sign token.",
          500
        );
      }

      return httpResponseSuccess(
        response,
        { user, accessToken: jsonData.data.token },
        "Email verified",
        200
      );
    } catch (error) {
      return httpResponseError(response, null, "Internal server error!", 500);
    }
  }

  static async login(request: Request, response: Response) {
    try {
      // const { data, success, error } = loginSchema.safeParse(request.body);
      const { email } = request.body;

      if (!email) {
        return httpResponseError(response, null, "Bad request", 400);
      }

      const user = await User.findOneBy({
        email,
      });

      if (!user) {
        return httpResponseError(
          response,
          null,
          "We couldn't find your account",
          404
        );
      }

      const { otp, token, hashedToken, hashedOtp } =
        await AuthController.getTokenAndOtp();

      try {
        await VerificationCode.delete({
          user: {
            id: user.id
          }
        });
        
          await VerificationCode.insert({
              code: hashedOtp,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
              user: user,
              token: hashedToken,
          });
      } catch (dbError) {
          console.error("Database error:", dbError);
          return httpResponseError(response, null, "Failed to insert verification code", 500);
      }

      const emailMessage: EmailMessage = {
        body: {
          name: user.name,
          intro: [
            "Welcome to ConnectED",
            `Here is your One-Time Password (OTP) to continue: `,
            `<h1 style="color: blue">${otp}<h1/>`,
          ],
          outro: [
            "Need help, or have questions? Just reply to this email, we'd love to help.",
          ],
        },
      };
      try {
        await sendEmail(
            emailMessage,
            user.email,
            "[ConnectED] Your One-Time Password"
        );
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return httpResponseError(response, null, "Failed to send OTP email", 500);
      }
      
      httpResponseSuccess(response, { user, token }, null, 200);
    } catch (error) {
      console.log(error);
      return httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async verifyFromLogin(request: Request, response: Response) {
    try {
      const { token, otp, email } = request.body;

      if (!token || !otp || !email) {
        return httpResponseError(
          response,
          null,
          "Missing required fields",
          400
        );
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      if (!user.emailVerifiedAt) {
        return httpResponseError(response, null, "Email not yet verified", 400);
      }

      const verificationCode = await VerificationCode.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (!verificationCode) {
        return httpResponseError(
          response,
          null,
          "Verification code not found",
          404
        );
      }

      const isOtpExpired =
        new Date(verificationCode?.expiresAt as Date) < new Date();

      if (isOtpExpired) {
        return httpResponseError(
          response,
          null,
          "Verification code expired",
          400
        );
      }

      const isOtpEqual = await bcryptjs.compare(
        otp,
        verificationCode?.code as string
      );

      if (!isOtpEqual) {
        return httpResponseError(
          response,
          null,
          "Invalid verification code",
          400
        );
      }

      const isTokenEqual = await bcryptjs.compare(
        token,
        verificationCode?.token as string
      );

      if (!isTokenEqual) {
        return httpResponseError(response, null, "Invalid token", 400);
      }

      await VerificationCode.delete({ id: verificationCode.id });

      const jsonData = await signToken({ id: user.id }, "7d");

      if (!jsonData.data) {
        return httpResponseError(
          response,
          null,
          "Internal server error. Failed to sign token.",
          500
        );
      }

      return httpResponseSuccess(response, {
        user,
        accessToken: jsonData.data.token,
      }, null, 200);
    } catch (error) {
      return httpResponseError(response, null, "Internal server error!", 500);
    }
  }

  static async resendOtp(request: Request, response: Response) {
    try {
      const { email, t } = request.body;

      if (!email || !t) {
        return httpResponseError(
          response,
          null,
          "Missing required fields",
          400
        );
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      const verificationCode = await VerificationCode.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (!verificationCode) {
        return httpResponseError(
          response,
          null,
          "Verification code not found",
          404
        );
      }

      if (!(await bcryptjs.compare(t, verificationCode.token))){
        return httpResponseError(
          response,
          null,
          "Invalid token",
          400
        );
      }

      const lastTokenCreatedAt = new Date(verificationCode.createdAt as Date);
      const threeMinutesLater = new Date(
        lastTokenCreatedAt.getTime() + 3 * 60 * 1000
      );

      if (new Date() < threeMinutesLater) {
        return httpResponseError(
          response,
          null,
          "Resend OTP request too frequent. Please try again later.",
          429
        );
      }

      const { otp, token, hashedToken, hashedOtp } =
        await AuthController.getTokenAndOtp();

      await VerificationCode.delete(verificationCode.id);

      await VerificationCode.insert({
        code: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        user: user,
        token: hashedToken,
      });

      const emailMessage: EmailMessage = {
        body: {
          name: user.name,
          intro: [
            "We have received your request to send you an OTP",
            `Here is your One-Time Password (OTP): `,
            `<h1 style="color: blue">${otp}<h1/>`,
          ],
          outro: [
            "Need help, or have questions? Just reply to this email, we'd love to help.",
          ],
        },
      };

      await sendEmail(emailMessage, user.email, "[ConnectED] Resend OTP");

      httpResponseSuccess(response, { user, token }, null, 200);
    } catch (error) {
      return httpResponseError(response, null, "Internal server error!", 500);
    }
  }
}
