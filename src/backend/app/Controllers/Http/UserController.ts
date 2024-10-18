import { User } from "Database/entities/user";
import { Request, Response } from "express";
import { EmailMessage, sendEmail } from "Helpers/mailer";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull, Not } from "typeorm";

// GET all users
export default class UserController {
  static async getAll(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      console.log("ln12", request.user);

      const data = await User.findAndCount({
        where: {
          archivedAt: IsNull(),
          emailVerifiedAt: Not(IsNull()),
        },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          bio: true,
          email: true,
          role: true,
          bannerUrl: true,
          createdAt: true,
          updatedAt: true,
          emailVerifiedAt: true,
          organizationName: true,
        },
        skip,
        take,
      });

      httpResponseSuccess(
        response,
        { users: data[0], count: data[1] },
        null,
        200
      );
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  // GET one user
  static async findById(request: Request, response: Response) {
    const id = request.params.id;

    const data = await User.findOneBy({
      id,
      archivedAt: IsNull(),
      emailVerifiedAt: Not(IsNull()),
    });

    if (!data) {
      response.status(404).json({
        status: 0,
        message: "User not found!",
      });
    }

    response.status(200).json({
      status: 1,
      data,
      message: null,
    });
  }

  static async getProviders(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          archivedAt: IsNull(),
          emailVerifiedAt: Not(IsNull()),
          role: "provider",
          providerVerifiedAt: Not(IsNull()),
          validIdUrl: Not(IsNull()),
        },
        select: {
          id: true,
          avatarUrl: true,
          bannerUrl: true,
          name: true,
          email: true,
          bio: true,
          validIdUrl: true,
        },
        skip,
        take,
      });

      httpResponseSuccess(
        response,
        { providers: data[0], count: data[1] },
        null,
        200
      );
    } catch (error) {
      console.log("78: ", error);
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async getNonVerifiedProviders(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          role: "provider",
          archivedAt: IsNull(),
          providerVerifiedAt: IsNull(),
          emailVerifiedAt: Not(IsNull()),
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          bannerUrl: true,
          bio: true,
          validIdUrl: true,
        },
        skip,
        take,
      });

      httpResponseSuccess(
        response,
        { providers: data[0], count: data[1] },
        null,
        200
      );
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async getStudents(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          archivedAt: IsNull(),
          emailVerifiedAt: Not(IsNull()),
          role: "student",
        },
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          avatarUrl: true,
          bannerUrl: true,
        },
        skip,
        take,
      });

      httpResponseSuccess(
        response,
        { students: data[0], count: data[1] },
        null,
        500
      );
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  // delete account
  static async deleteById(request: Request, response: Response) {
    try {
      const user = await User.findOne({
        where: {
          id: request.user,
        },
        select: {
          role: true,
        },
      });

      if (!user) {
        return response.status(401).json({
          success: 0,
          message: "Unauthorized!",
        });
      }

      const id = request.params.id;
      const isUserExists = await User.findOneBy({ id });

      if (!isUserExists) {
        return response.status(404).json({
          success: 0,
          data: null,
          message: "User not found!",
        });
      }

      if (isUserExists.id != request.user && user.role != "admin") {
        return response.status(403).json({
          success: 0,
          data: null,
          message: "Forbidden!",
        });
      }

      const data = await User.delete({ id });

      if (!data.affected || data.affected == 0) {
        response.status(400).json({
          status: 0,
          message: "User doesn't exist!",
        });
      }

      response.status(200).json({
        status: 1,
        message: "User has been deleted!",
      });
    } catch (error) {
      return response.status(500).json({
        success: 0,
        message: "Server error!",
      });
    }
  }

  // for test
  static async deleteMany(request: Request, response: Response) {
    await User.clear();
    response.status(200).json({
      status: 1,
      message: "Users deleted.",
    });
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadValidIdUrl(request: Request, response: Response) {
    try {
      const { validIdUrl } = request.body;

      if (!validIdUrl) {
        return response.status(400).json({
          status: 0,
          message: "Invalid ID URL!",
        });
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return response.status(404).json({
          status: 0,
          message: "User not found!",
        });
      }

      if (user.role != "provider") {
        return response.status(403).json({
          status: 0,
          message: "Only providers can upload ID URLs.",
        });
      }

      user.validIdUrl = validIdUrl;
      await User.save(user);
      response.status(200).json({
        status: 1,
        message: "Valid ID URL updated.",
        user,
      });
    } catch (error: any) {
      console.log("LN176", error);
      response.status(500).json({
        status: 0,
        message: "Server error",
      });
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadAvatarUrl(request: Request, response: Response) {
    try {
      const { avatarUrl } = request.body;

      if (!avatarUrl) {
        return response.status(400).json({
          status: 0,
          message: "Invalid avatar URL!",
        });
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return response.status(404).json({
          status: 0,
          message: "User not found!",
        });
      }

      user.avatarUrl = avatarUrl;
      await User.save(user);
      response.status(200).json({
        status: 1,
        message: "Avatar URL updated.",
        user,
      });
    } catch (error: any) {
      console.log("LN226", error);
      response.status(500).json({
        status: 0,
        message: "Server error",
      });
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadBannerUrl(request: Request, response: Response) {
    try {
      console.log("req.user", request.user);

      const { bannerUrl } = request.body;

      if (!bannerUrl) {
        return response.status(400).json({
          status: 0,
          message: "Invalid banner URL!",
        });
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return response.status(404).json({
          status: 0,
          message: "User not found!",
        });
      }

      user.bannerUrl = bannerUrl;
      await User.save(user);
      response.status(200).json({
        status: 1,
        message: "Banner URL updated.",
        user,
      });
    } catch (error: any) {
      console.log("LN280", error);
      response.status(500).json({
        status: 0,
        message: "Server error",
      });
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async updateSelf(request: Request, response: Response) {
    try {
      const { name, bio } = request.body;

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(404).json({
          status: 0,
          message: "User not found!",
        });
      }

      user.name = name ?? user.name;

      if (bio === "") {
        user.bio = null;
      } else if (bio) {
        user.bio = bio;
      }

      await User.save(user);
      response.status(200).json({
        status: 1,
        message: "User updated.",
        user,
      });
    } catch (error: any) {
      console.log("LN392", error);
      return response.status(500).json({
        status: 0,
        message: "Server error",
      });
    }
  }

  static async test(request: Request, response: Response) {
    try {
      const emailMessage: EmailMessage = {
        body: {
          name: "Kurtd Daniel Bigtas",
          intro: "Test ulit gamit dfx deploy",
          action: {
            instructions: "To get started with Mailgen, please click here:",
            button: {
              color: "#22BC66",
              text: "click kung baliw ka",
              link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
            },
          },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      };

      const jsonData = await sendEmail(
        emailMessage,
        "johnraybendelarama@student.laverdad.edu.ph",
        "TEST EMAIL FROM IC (1)"
      );

      return response.json(jsonData);
    } catch (error) {
      console.log("LN415", error);
      response.status(500).json({
        status: 0,
        message: "Server error",
      });
    }
  }
}
