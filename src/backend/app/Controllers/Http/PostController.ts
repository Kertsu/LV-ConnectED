import { Bookmark } from "Database/entities/bookmark";
import { Post } from "Database/entities/post";
import { User } from "Database/entities/user";
import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull } from "typeorm";

export default class PostController {
  static async getPosts(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const { sortOrder = "ASC", type } = request.query;

      const whereConditions: any = {
        archivedAt: IsNull(),
      };

      if (type) {
        whereConditions.type = type;
      }

      const data = await Post.findAndCount({
        where: whereConditions,
        relations: [
          "user",
          "feedbacks",
          "feedbacks.user",
          "bookmarks",
          "bookmarks.user",
        ],
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
      });

      const formattedPosts = data[0].map((post) => ({...post, isBookmarked: post.bookmarks.some((bookmark) => bookmark.user.id === request.user)}));

      httpResponseSuccess(response, { posts: formattedPosts, count: data[1] });
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async findPostById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const post = await Post.findOne({
        where: {
          id,
        },
        relations: [
          "user",
          "feedbacks",
          "feedbacks.user",
          "bookmarks",
          "bookmarks.user",
        ],
      });

      if (!post) {
        return httpResponseError(response, null, "Post not found", 404);
      }

      const bookmarked = await Bookmark.findOne({
        where: {
          post: {
            id: post.id
          }
        }
      });

      httpResponseSuccess(response, { post, isBookmarked: !!bookmarked  });
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  // TODO: Thumbnail upload
  static async create(request: Request, response: Response) {
    try {
      const { title, thumbnail, type, content } = request.body;
      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      if (user.role != "provider") {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      if (!user.providerVerifiedAt) {
        return httpResponseError(
          response,
          null,
          "You must be a verified provider!",
          403
        );
      }

      const post = Post.create({
        title,
        content,
        thumbnail,
        type,
        user,
      });

      await Post.save(post);

      httpResponseSuccess(response, { post }, "New post created");
    } catch (error) {
      console.error(error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async updateById(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const { thumbnail, title, type, content } = request.body;

      const post = await Post.findOne({
        where: {
          id,
          archivedAt: IsNull(),
        },
        select: {
          user: {
            id: true,
            role: true,
            archivedAt: true,
            providerVerifiedAt: true,
          },
        },
        relations: ["user"],
      });

      if (!post) {
        return httpResponseError(response, null, "Post not found!", 404);
      }

      if (post?.user.id != request.user && post?.user.role != "admin") {
        return httpResponseError(response, null, "Unauthorized!", 401);
      }

      if (!post?.user.providerVerifiedAt) {
        return httpResponseError(response, null, "Forbidden!", 403);
      }

      await Post.update({ id }, { thumbnail, title, type, content });

      const updatedPost = await Post.findOne({
        where: {
          id: post.id,
        },
        relations: ["user"],
      });

      httpResponseSuccess(
        response,
        { post: updatedPost },
        "Post has been updated!"
      );
    } catch (error) {
      console.error(error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async deleteById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const post = await Post.findOne({
        where: {
          id,
        },
        select: {
          id: true,
          user: {
            id: true,
            role: true,
            providerVerifiedAt: true,
          },
        },
        relations: ["user"],
      });

      if (!post) {
        return httpResponseError(response, null, "Post not found!", 404);
      }

      if (post?.user.id != request.user && post?.user.role != "admin") {
        return httpResponseError(response, null, "Forbidden!", 403);
      }

      if (!post?.user.providerVerifiedAt) {
        return httpResponseError(response, null, "Forbidden!", 403);
      }

      const data = await Post.delete({ id });

      httpResponseSuccess(response, null, "Post has been deleted");
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  // TODO: get archived posts
}
