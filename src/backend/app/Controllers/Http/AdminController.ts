import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull, Not } from "typeorm";
import { Post } from "../../../database/entities/post";
import { User } from "../../../database/entities/user";

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
      console.log("Error archiving user: ", error);
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

  static async getProviders(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const {
        sortOrder = "ASC",
        type,
        verified = "true",
        archived = "false",
        emailVerified = "true",
      } = request.query;

      const whereCondition: any = {
        role: "provider",
        providerVerifiedAt: verified === "true" ? Not(IsNull()) : IsNull(),
        archivedAt: archived === "true" ? Not(IsNull()) : IsNull(),
        emailVerifiedAt: emailVerified === "true" ? Not(IsNull()) : IsNull(),
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
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          email: true,
          createdAt: true,
          validIdUrl: true,
          providerVerifiedAt: true,
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

  static async getUsers(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;
      const {
        sortOrder = "ASC",
        archived = "false",
        emailVerified = "true",
      } = request.query;

      const whereCondition = {
        archivedAt: archived === "true" ? Not(IsNull()) : IsNull(),
        emailVerifiedAt: emailVerified === "true" ? Not(IsNull()) : IsNull(),
      };

      const data = await User.findAndCount({
        where: whereCondition,
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          email: true,
          createdAt: true,
          validIdUrl: true,
          providerVerifiedAt: true,
        },
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

  static async getStudents(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const {
        sortOrder = "ASC",
        archived = "false",
        emailVerified = "true",
      } = request.query;

      const whereConditions: any = {
        role: "student",
        archivedAt: archived === "true" ? Not(IsNull()) : IsNull(),
        emailVerifiedAt: emailVerified === "true" ? Not(IsNull()) : IsNull(),
      };

      const data = await User.findAndCount({
        where: whereConditions,
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          email: true,
          createdAt: true,
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

  static async getPosts(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const { sortOrder = "ASC", type, archived = "false" } = request.query;

      const whereConditions: any = {
        archivedAt: archived == "true" ? Not(IsNull()) : IsNull(),
      };

      if (type) {
        whereConditions.type = type;
      }

      const data = await Post.findAndCount({
        where: whereConditions,
        relations: [
          "user",
        ],
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
        select: {
          id: true,
          title: true,
          type: true,
          createdAt: true,
          thumbnail: true,
          archivedAt: true,
          user: {
            id: true,
            name: true,
            avatarUrl: true,
            email: true,
            createdAt: true
          }
        },
      });

      httpResponseSuccess(response, { posts: data[0], count: data[1] });
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }
}
