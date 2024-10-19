import { Post } from "Database/entities/post";
import { User } from "Database/entities/user";
import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull, Not } from "typeorm";

export default class AdminController {
  static async archiveUserById(request: Request, response: Response) {
    try {
      const currentUser = await User.findOneBy({ id: request.user });

      // check if auth user exists
      if (!currentUser) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      const id = request.params.id;
      const user = await User.findOneBy({ id });

      // check if user exists
      if (!user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      if (user.archivedAt) {
        return httpResponseError(
          response,
          null,
          "User is already archived",
          400
        );
      }

      user.archivedAt = new Date();
      user.save();

      httpResponseSuccess(response, null, "User archived");
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async unarchiveUserById(request: Request, response: Response) {
    try {
      const currentUser = await User.findOneBy({ id: request.user });

      if (!currentUser) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      const id = request.params.id;
      const user = await User.findOneBy({ id });

      if (!user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      if (!user.archivedAt) {
        return httpResponseError(response, null, "User is not archived", 400);
      }

      user.archivedAt = null;
      user.save();

      httpResponseSuccess(response, null, "User unarchived");
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async verifyProvider(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      const id = request.params.id;
      const provider = await User.findOne({
        where: {
          id,
          archivedAt: IsNull(),
          providerVerifiedAt: IsNull(),
          role: "provider",
        },
      });

      if (!provider) {
        return httpResponseError(response, null, "User not found", 404);
      }

      provider.providerVerifiedAt = new Date();
      await provider.save();

      httpResponseSuccess(
        response,
        { provider },
        "Provider has been verified!"
      );
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async archivePostById(request: Request, response: Response) {
    try {
      const currentUser = await User.findOneBy({ id: request.user });

      // check if auth user exists
      if (!currentUser) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      const id = request.params.id;
      const post = await Post.findOneBy({ id });

      // check if post exists
      if (!post) {
        return httpResponseError(response, null, "Post not found", 404);
      }

      if (post.archivedAt) {
        return httpResponseError(
          response,
          null,
          "Post is already archived",
          400
        );
      }

      post.archivedAt = new Date();
      post.save();

      httpResponseSuccess(response, null, "Post archived");
    } catch (error) {
      return httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async unarchivePostById(request: Request, response: Response) {
    try {
      const currentUser = await User.findOneBy({ id: request.user });

      if (!currentUser) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      if (currentUser.role != "admin") {
        return httpResponseError(response, null, "Forbidden", 403);
      }

      const id = request.params.id;
      const post = await Post.findOneBy({ id });

      if (!post) {
        return httpResponseError(response, null, "Post not found", 404);
      }

      if (!post.archivedAt) {
        return httpResponseError(response, null, "Post is not archived", 400);
      }

      post.archivedAt = null;
      post.save();

      httpResponseSuccess(response, null, "Post unarchived");
    } catch (error) {
      return httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  // get archive users and posts
  static async getArchivedUsers(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          archivedAt: Not(IsNull()),
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
  // get non verified users
  static async getNonVerifiedUsers(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          archivedAt: IsNull(),
          emailVerifiedAt: IsNull(),
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

  // get non verified providers (admin management)
  static async getNonVerifiedProviders(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        id: request.user,
      });

      if (!user) {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      const skip = request.skip;
      const take = request.limit;

      const data = await User.findAndCount({
        where: {
          archivedAt: IsNull(),
          providerVerifiedAt: Not(IsNull()),
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
}
