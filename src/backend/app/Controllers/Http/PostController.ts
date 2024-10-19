import { Post } from "Database/entities/post";
import { User } from "Database/entities/user";
import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { IsNull } from "typeorm";

export default class PostController {
  static async getAll(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const data = await Post.findAndCount({
        where: {
          archivedAt: IsNull(),
        },
        select: {
          id: true,
          title: true,
          content: true,
          type: true,
          thumbnail: true,
          createdAt: true,
          user: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        skip,
        take,
      });

      httpResponseSuccess(response, { posts: data[0], count: data[1] });
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async findByCategoryType(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;

      const type = request.params.type; // type of post

      const data = await Post.findAndCount({
        where: {
          type,
          archivedAt: IsNull(),
        },
        skip,
        take,
        select: {
          id: true,
          title: true,
          content: true,
          type: true,
          thumbnail: true,
          createdAt: true,
        },
        relations: ["user", "feedbacks", "feedbacks.user"], 
      });

      httpResponseSuccess(response, { posts: data[0], count: data[1] });
    } catch (error) {
      console.error(error); 
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async findById(request: Request, response: Response) {
    const id = request.params.id;

    const data = await Post.findOne({
      where: {
        id,
        archivedAt: IsNull(),
      },
      select: {
        id: true,
        user: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        title: true,
        thumbnail: true,
        content: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!data) {
      response.status(404).json({
        status: 0,
        message: "Post not found!",
      });
    }

    response.status(200).json({
      status: 1,
      data,
      message: null,
    });
  }

  // TODO: Thumbnail upload
  static async create(request: Request, response: Response) {
    try {
      const { title, thumbnail, type, content } = request.body;
      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized!",
        });
      }

      if (user.role != "provider") {
        return response.status(403).json({
          status: 0,
          message: "Forbidden!",
        });
      }

      if (!user.providerVerifiedAt) {
        return response.status(403).json({
          status: 0,
          message: "You must be a verified provider!",
        });
      }

      const data = await Post.create({
        title,
        content,
        thumbnail,
        type,
        user,
      });

      await Post.save(data);

      return response.status(201).json({
        status: 1,
        data,
        message: "New post created!",
      });
    } catch (error) {
      response.status(500).json({
        status: 0,
        error,
        message: "Internal server error!",
      });
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
          },
        },
      });

      if (!post) {
        return response.status(404).json({
          status: 0,
          message: "Post not found!",
        });
      }

      if (post?.user.id != request.user && post?.user.role != "admin") {
        return response.status(403).json({
          status: 0,
          message: "Forbidden!",
        });
      }

      if (!post?.user.providerVerifiedAt) {
        return response.status(403).json({
          status: 0,
          message: "Forbidden!",
        });
      }

      const data = await Post.update(
        { id },
        { thumbnail, title, type, content }
      );

      return response.status(200).json({
        status: 1,
        data,
        message: "Post has been updated!",
      });
    } catch (error) {
      return response.status(500).json({
        status: 0,
        error,
        message: "Server error",
      });
    }
  }

  static async deleteById(request: Request, response: Response) {
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
        },
      },
    });

    if (!post) {
      return response.status(404).json({
        status: 0,
        data: null,
        message: "Post doesn't exist!",
      });
    }

    if (post?.user.id != request.user && post?.user.role != "admin") {
      return response.status(403).json({
        status: 0,
        data: null,
        message: "Forbidden!",
      });
    }

    if (!post?.user.providerVerifiedAt) {
      return response.status(403).json({
        status: 0,
        message: "Forbidden!",
      });
    }

    const data = await Post.delete({ id });

    return response.status(200).json({
      status: 1,
      data,
      message: "Post has been deleted!",
    });
  }

  // TODO: get archived posts
}
