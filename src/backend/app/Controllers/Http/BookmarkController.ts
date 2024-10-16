import { Bookmark } from "Database/entities/bookmark";
import { User } from "Database/entities/user";
import { Request, Response } from "express";

export default class BookmarkController {  
    static async getUserBookmarks(request: Request, response: Response) {
        try {
            const skip = request.skip;
            const take = request.limit;
            
            const data = await User.find({
                where: {
                    id: request.user
                },
                select: {
                    id: true,
                    bookmarks: {
                        post: {
                            id: true,
                            title: true,
                            content: true,
                            thumbnail: true,
                            createdAt: true,
                        }
                    }
                },
                relations: ['bookmarks', 'bookmarks.post'],
                skip,
                take
            });

            return response.status(200).json({
                success: 1,
                data,
                message: null
            });
        } catch (error) {
            response.status(500).json({
                success: 0,
                error,
                message: "Internal server error!"
            })
        }
    }

    static async createBookmark(request: Request, response: Response) {
        try {
            const { postId } = request.body;

            const data = await Bookmark.insert({
                post: {
                    id: postId
                },
                user: {
                    id: request.user
                }
            });

            return response.status(201).json({
                success: 1,
                data,
                message: null
            });
        } catch (error) {
            response.status(500).json({
                success: 0,
                error,
                message: "Internal server error!"
            });
        }
    }

    static async deleteBookmark(request: Request, response: Response) {
        try {
            const user = await User.findOneBy({ id: request.user });
            const id = request.params.id;
            const bookmark = await Bookmark.findOneBy({ id });

            if (!user) {
                return response.status(401).json({
                    success: 0,
                    message: "Unauthorized!"
                });
            }

            if (!bookmark) {
                return response.status(404).json({
                    success: 0,
                    message: "Bookmarked post not found!"
                });
            }

            await Bookmark.delete({ id });

            return response.status(200).json({
                success: 1,
                message: "Bookmark deleted"
            });
        } catch (error) {
            response.status(500).json({
                success: 0,
                message: "Server error!"
            })
        }
    }
}