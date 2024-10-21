import { APIResponse } from "@/types/api-response";
import { Post } from "@/types/model";
import axiosInstance from "./axiosConfig";

//GET all post
export const getAllPosts = async (skip: number, take: number) => {
  const response = await axiosInstance.post(`/posts`, {},{
    params: {
      page: skip / take,
      take,
    },
  });
  return response.data;
};

//get ALl posts for admin
export const getAllPostsForAdmin = async (
  page: number,
  take: number,
  sortOrder: string = "DESC"
) => {
  const response = await axiosInstance.post(
    `/admin/posts`,
    {},
    {
      params: {
        page,
        take,
        sortOrder,
        archived: "false",
      },
    }
  );
  return response.data;
};

//GET all archived posts

//GET one post
export const getPostById = async (id: string) => {
  const response = await axiosInstance.post<APIResponse<{
    post: Post,
    isBookmarked: boolean;
  }>>(`/posts/${id}`);
  return response.data;
};

//GET post by type scholarship | internship
export const getPostsByCategoryType = async (
  type: string,
  skip: number,
  take: number
) => {
  const response = await axiosInstance.get(`/api/posts/category/${type}`, {
    params: {
      skip,
      limit: take,
    },
  });
  return response.data;
};

// Create Post
export const createPost = async (
  title: string,
  thumbnail: string,
  type: string,
  content: string
) => {
  const response = await axiosInstance.post("/posts/create", {
    title,
    thumbnail,
    type,
    content,
  });
  return response.data;
};

//Delete Post
export const deletePost = async (id: string): Promise<void> => {
  const response = await axiosInstance.post(`/posts/${id}/remove`);
  return response.data;
};

//Archive Post
export const archivePostById = async (id: string) => {
  const response = await axiosInstance.post(`/admin/posts/${id}/archive`);
  return response.data;
};

//Archive Post
export const unArchivePostById = async (id: string) => {
  const response = await axiosInstance.post(`/admin/posts/${id}/unarchive`);
  return response.data;
};

// Get all archived posts
export const getArchivedPosts = async (
  page: number,
  take: number,
  sortOrder: string = "ASC"
) => {
  const response = await axiosInstance.post(
    "/admin/posts",
    {},
    {
      params: {
        page,
        take,
        sortOrder,
        archived: "true",
      },
    }
  );
  console.log("ln:79 postService.ts", response.data); // Add this line to log the response data
  return response.data;
};
