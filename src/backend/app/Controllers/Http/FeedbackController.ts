import { Request, Response } from "express";
import { Feedback } from "../../../database/entities/feedback";
import { User } from "../../../database/entities/user";

export default class FeedbackController {
    static async getPostFeedbacks(request: Request, response: Response) {
        try {
            const skip = request.skip;
            const take = request.limit;
            const postId = request.params.postId;

            const data = await Feedback.findAndCount({
                where: {
                    post: {
                        id: postId
                    }
                },
                select: {
                    id: true,
                    rate: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true
                    },
                    post: {
                        id: true
                    }
                },
                skip,
                take
            });

            response.status(200).json({
                status: 1,
                data,
                message: null
            });
        } catch (error) {
            response.status(500).json({
                status: 0,
                error,
                message: "Internal server error!"
            });
        }
    }

    static async createFeedback(request: Request, response: Response) {
        try {
            const user = await User.findOneBy({ id: request.user });

            if (!user || !user.emailVerifiedAt) {
                return response.status(401).json({
                    status: 0,
                    message: "Unauthorized!"
                });
            }

            if (user.role != "student") {
                return response.status(403).json({
                    status: 0,
                    message: "Forbidden!"
                });
            }

            const { postId, rate, content } = request.body;

            const data = await Feedback.insert({
                user: {
                    id: user.id,
                },
                post: {
                    id: postId
                },
                rate, 
                content: content || null
            });

            return response.status(201).json({
                status: 1,
                data,
                message: null
            });
        } catch (error) {
            response.status(500).json({
                status: 0,
                error,
                message: "Internal server error!"
            })
        }
    }

    static async updateFeedback(request: Request, response: Response) {
        try {
            const { content, rate } = request.body;
            const id = request.params.id;

            const isFeedbackExist = await Feedback.findOne({
                where: {
                    id
                },
                select: {
                    user: {
                        id: true
                    }
                }
            });

            if (!isFeedbackExist) {
                return response.status(404).json({
                    status: 0,
                    message: "Feedback not found!"
                });
            }

            if (isFeedbackExist?.user.id != request.user) {
                return response.status(403).json({
                    status: 0,
                    message: "Forbidden!"
                });
            }
            
            const data = await Feedback.update({
                id
            }, {
                content,
                rate
            });

            return response.status(200).json({
                status: 1,
                data,
                message: "Feedback updated."
            });
        } catch (error) {
            response.status(500).json({
                status: 0,
                error,
                message: "Internal server error!"
            });
        }
    }

    static async deleteFeedback(request: Request, response: Response) {
        try {
            const id = request.params.id;
            
            const feedback = await Feedback.findOne({
                where: {
                    id
                },
                select: {
                    user: {
                        id: true
                    }
                }
            });

            if (!feedback) {
                return response.status(404).json({
                    status: 0,
                    data: null,
                    message: "Feedback not found!"
                });
            }

            if (!feedback.user) {
                return response.status(401).json({
                    status: 0,
                    message: "User not found!"
                });
            }

            if (feedback?.user.id != request.user) {
                return response.status(403).json({
                    status: 0,
                    data: null,
                    message: "Forbidden!"
                });
            }

            await Feedback.delete({ id: feedback.id });

            response.status(200).json({
                status: 1,
                message: "Feedback deleted."
            });
        } catch (error) {
            response.status(500).json({
                status: 0,
                error,
                message: "Internal server error!"
            })
        }
    }
}