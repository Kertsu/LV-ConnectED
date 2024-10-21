import {
  archivePostById,
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsForAdmin,
  getArchivedPosts,
  getPostById,
  getPostsByCategoryType,
  unArchivePostById,
} from "@/api/postService";
import { useMutation, useQuery } from "@tanstack/react-query";

// get ALL post
export const useAllPost = (skip: number, take: number) => {
  return useQuery({
    queryKey: ["posts", skip, take],
    queryFn: () => getAllPosts(skip, take),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: skip >= 0 && take > 0,
    select: (data) => ({ posts: data.posts, count: data.count }), // Return both data and count
  });
};



// get ONE post
export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    staleTime: 5000,
  });
};

//get post by TYPE
export const useAllPostByCategoryType = (
  type: string,
  skip: number,
  take: number
) => {
  return useQuery({
    queryKey: ["posts", type, skip, take],
    queryFn: () => getPostsByCategoryType(type, skip, take),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: skip >= 0 && take > 0,
  });
};

// CREATE post
export const useCreatePost = () => {
  return useMutation({
    mutationFn: async ({
      title,
      thumbnail,
      type,
      content,
    }: {
      title: string;
      thumbnail: string;
      type: string;
      content: string;
    }) => {
      return createPost(title, thumbnail, type, content);
    },
  });
};

//DELETE post
export const useDeletePost = () => {
  return useMutation({
    mutationFn: async (id: string) => deletePost(id),
  });
};

//Archive post
export const useArchivePost = () => {
  return useMutation({
    mutationFn: async (id: string) => archivePostById(id),
  });
};

//unArchive post
export const useUnArchivePost = () => {
  return useMutation({
    mutationFn: async (id: string) => unArchivePostById(id),
  });
};

export const useGetAllArchivedPosts = (
  page: number,
  take: number,
  sortOrder: string = "ASC"
) => {
  return useQuery({
    queryKey: ["archivedPosts", page, take, sortOrder],
    queryFn: () => getArchivedPosts(page, take, sortOrder),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    select: (data) => ({ posts: data.posts, count: data.count }), // Return both data and count
  });
};
export const useGetAllPostsForAdmin = (
  page: number,
  take: number,
  sortOrder: string = "DESC"
) => {
  return useQuery({
    queryKey: ["posts", page, take, sortOrder],
    queryFn: () => getAllPostsForAdmin(page, take, sortOrder),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    select: (data) => ({ posts: data.posts, count: data.count }), // Return both data and count
  });
};


