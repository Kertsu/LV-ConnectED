import { Bookmark } from "Database/entities/bookmark";
import { Post } from "Database/entities/post";
import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull, Not } from "typeorm";
import { User } from "../../../database/entities/user";

// GET all users
export default class UserController {
  static async getSelf(request: Request, response: Response) {
    const user = await User.findOneBy({ id: request.user });

    if (!user) {
      return httpResponseError(response, null, "Account not found", 401);
    }

    httpResponseSuccess(response, { user }, null, 200);
  }

  // GET one user
  static async findUserById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const user = await User.findOneBy({
        id,
        archivedAt: IsNull(),
        emailVerifiedAt: Not(IsNull()),
      });

      if (!user) {
        return httpResponseError(response, null, "User not found!", 404);
      }
      httpResponseSuccess(response, { user }, null, 200);
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async getProviders(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const { sortOrder = "ASC", type } = request.query;

      const whereCondition: any = {
        role: "provider",
        providerVerifiedAt: Not(IsNull()),
        archivedAt: IsNull(),
        emailVerifiedAt: Not(IsNull()),
      };

      if (type) {
        whereCondition.type = type;
      }

      const data = await User.findAndCount({
        where: whereCondition,
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
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

  static async getProviderById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const provider = await User.findOne({
        where: {
          id: id,
          role: "provider",
        },
      });

      if (!provider) {
        return httpResponseError(response, null, "Provider not found!", 404);
      }

      return httpResponseSuccess(response, provider, null, 200);
    } catch (error) {
      console.log("Error fetching provider: ", error);
      return httpResponseError(response, null, "Internal Server Error!", 500);
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

      const { sortOrder = "ASC" } = request.query;

      const data = await User.findAndCount({
        where: {
          role: "student",
          archivedAt: IsNull(),
          emailVerifiedAt: Not(IsNull()),
        },
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
      });

      httpResponseSuccess(
        response,
        { students: data[0], count: data[1] },
        null,
        200
      );
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async deleteUserById(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const userToRemove = await User.findOne({
        where: { id },
        relations: ["posts", "feedbacks", "bookmarks", "verificationCode"],
      });

      if (!userToRemove) {
        return httpResponseError(response, null, "User not found!", 404);
      }

      if (userToRemove.id === request.user) {
        return httpResponseError(response, null, "Bad workflow", 403);
      }

      if (userToRemove.role === "admin") {
        return httpResponseError(
          response,
          null,
          "Cannot delete admin account",
          403
        );
      }

      const result = await User.remove(userToRemove);

      if (!result) {
        return httpResponseError(response, null, "Failed to delete user!", 500);
      }

      httpResponseSuccess(response, null, "User has been deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      return httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async deleteSelf(request: Request, response: Response) {
    try {
      await User.delete({ id: request.user });
      httpResponseSuccess(response, null, "Account deleted");
    } catch (error) {
      return httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  // for test
  static async deleteMany(request: Request, response: Response) {
    try {
      await User.clear();
      httpResponseSuccess(response, null, "All users have been deleted");
    } catch (error) {
      return httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadValidIdUrl(request: Request, response: Response) {
    try {
      const { validIdUrl } = request.body;

      if (!validIdUrl) {
        return httpResponseError(response, null, "ID URL is required", 400);
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Bad request", 400);
      }

      if (user.role != "provider") {
        return httpResponseError(
          response,
          null,
          "Only providers can upload ID URLs.",
          403
        );
      }

      user.validIdUrl = validIdUrl;
      await User.save(user);
      httpResponseSuccess(
        response,
        { user },
        "Valid ID URL saved successfully"
      );
    } catch (error: any) {
      return httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadAvatarUrl(request: Request, response: Response) {
    try {
      const { avatarUrl } = request.body;

      if (!avatarUrl) {
        return httpResponseError(response, null, "Invalid avatar URL!", 400);
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Bad request", 400);
      }

      user.avatarUrl = avatarUrl;
      await User.save(user);

      httpResponseSuccess(response, { user }, "Avatar URL saved successfully");
    } catch (error: any) {
      console.log("LN226", error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async uploadBannerUrl(request: Request, response: Response) {
    try {
      const { bannerUrl } = request.body;

      if (!bannerUrl) {
        return httpResponseError(response, null, "Banner URL is required", 400);
      }

      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Bad request", 400);
      }

      user.bannerUrl = bannerUrl;
      await User.save(user);

      httpResponseSuccess(response, { user }, "Banner URL saved successfully");
    } catch (error: any) {
      console.log("LN280", error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  // Need to replace ID with the actual user ID coming from the request (req.user)
  static async updateSelf(request: Request, response: Response) {
    try {
      const { name, bio } = request.body;

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return httpResponseError(response, null, "Bad Request", 400);
      }

      user.name = name ?? user.name;

      if (bio === "") {
        user.bio = null;
      } else if (bio) {
        user.bio = bio;
      }

      await User.save(user);
      httpResponseSuccess(response, { user }, "Profile updated successfully");
    } catch (error: any) {
      console.log("LN392", error);
      return httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async getSelfPosts(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const { sortOrder = "ASC" } = request.query;

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return httpResponseError(response, null, "Bad Request", 400);
      }

      if (user.role !== "provider") {
        return httpResponseError(response, null, "Forbidden", 403);
      }

      const posts = await Post.find({
        where: {
          user: {
            id: user.id,
          },
        },
        skip,
        take,
        relations: ["feedbacks", "feedbacks.user"],
        order: {
          createdAt: sortOrder === "DESC" ? "DESC" : "ASC",
        },
      });

      httpResponseSuccess(response, { posts }, "Posts fetched successfully");
    } catch (error: any) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async getSelfBookmarks(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const { sortOrder = "ASC" } = request.query;

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return httpResponseError(response, null, "Bad Request", 400);
      }

      const bookmarks = await Bookmark.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ["post", "post.user"],
        skip,
        take,
        order: {
          createdAt: sortOrder === "DESC" ? "DESC" : "ASC",
        },
      });

      httpResponseSuccess(
        response,
        { bookmarks },
        "Bookmarks fetched successfully"
      );
    } catch (error: any) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async test(request: Request, response: Response) {
    httpResponseSuccess(response, null, "testing");
  }
}
