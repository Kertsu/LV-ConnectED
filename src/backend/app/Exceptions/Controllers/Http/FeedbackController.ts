import { Request, Response } from "express";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { Feedback } from "../../../database/entities/feedback";
import { User } from "../../../database/entities/user";

export default class FeedbackController {
  static async getPostFeedbacks(request: Request, response: Response) {
    try {
      const skip = request.skip;
      const take = request.limit;
      const id = request.params.id;

      const { sortOrder = "ASC" } = request.query;

      const data = await Feedback.findAndCount({
        where: {
          post: {
            id,
          },
        },
        relations: ["user"],
        skip,
        take,
        order: {
          id: sortOrder === "DESC" ? "DESC" : "ASC",
        },
      });

      httpResponseSuccess(response, { feedbacks: data[0], count: data[1] });
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }

  static async createFeedback(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({ id: request.user });

      if (!user || !user.emailVerifiedAt) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      if (user.role != "student") {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      const { postId, rate, content } = request.body;

      const isExist = await Feedback.findOne({
        where: {
          user: {
            id: user.id,
          },
          post: {
            id: postId,
          },
        },
        relations: ["user", "post"],
      });

      if (isExist) {
        return httpResponseError(
          response,
          null,
          "You already submitted a feedback!",
          400
        );
      }

      const post = Feedback.create({
        user: {
          id: user.id,
        },
        post: {
          id: postId,
        },
        rate,
        content: content || null,
      });

      await Feedback.save(post);

      httpResponseSuccess(response, { post }, null, 201);
    } catch (error) {
      httpResponseError(response, null, "Internal Server Error!", 500);
    }
  }

  static async deleteFeedback(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const feedback = await Feedback.findOne({
        where: {
          id,
        },
        select: {
          user: {
            id: true,
          },
        },
        relations: ["user"],
      });

      if (!feedback) {
        return httpResponseError(response, null, "Feedback not found", 404);
      }

      if (!feedback.user) {
        return httpResponseError(response, null, "User not found", 404);
      }

      if (feedback?.user.id != request.user) {
        return httpResponseError(response, null, "Unauthorized", 401);
      }

      await Feedback.delete({ id: feedback.id });

      httpResponseSuccess(response, null, "Feedback deleted successfully", 200);
    } catch (error) {
      console.log(error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }
}
